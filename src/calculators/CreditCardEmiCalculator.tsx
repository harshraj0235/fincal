import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, CreditCard, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const CreditCardEmiCalculator: React.FC = () => {
  const [purchaseAmount, setPurchaseAmount] = useState<number>(50000);
  const [tenure, setTenure] = useState<number>(6);
  const [interestRate, setInterestRate] = useState<number>(15);
  const [processingFee, setProcessingFee] = useState<number>(1);
  const [monthlyEmi, setMonthlyEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  useEffect(() => {
    // Calculate EMI
    const monthlyRate = interestRate / 12 / 100;
    const emi = (purchaseAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
               (Math.pow(1 + monthlyRate, tenure) - 1);
    
    const processingAmount = (processingFee / 100) * purchaseAmount;
    const totalPayment = emi * tenure + processingAmount;
    const interestAmount = totalPayment - purchaseAmount;
    
    setMonthlyEmi(emi);
    setTotalInterest(interestAmount);
    setTotalAmount(totalPayment);
  }, [purchaseAmount, tenure, interestRate, processingFee]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-[--primary-600]" />
          Credit Card EMI Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="purchase-amount" className="text-sm font-medium text-neutral-700">
                Purchase Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(purchaseAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="purchase-amount"
              min="1000" 
              max="500000" 
              step="1000" 
              value={purchaseAmount} 
              onChange={(e) => setPurchaseAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="tenure" className="text-sm font-medium text-neutral-700">
                EMI Tenure (Months)
              </label>
              <span className="text-sm text-neutral-500">
                {tenure} months
              </span>
            </div>
            <input 
              type="range" 
              id="tenure"
              min="3" 
              max="24" 
              value={tenure} 
              onChange={(e) => setTenure(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                Interest Rate (% p.a.)
              </label>
              <span className="text-sm text-neutral-500">
                {interestRate}%
              </span>
            </div>
            <input 
              type="range" 
              id="interest-rate"
              min="12" 
              max="36" 
              step="0.5" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="processing-fee" className="text-sm font-medium text-neutral-700">
                Processing Fee (%)
              </label>
              <span className="text-sm text-neutral-500">
                {processingFee}%
              </span>
            </div>
            <input 
              type="range" 
              id="processing-fee"
              min="0" 
              max="3" 
              step="0.1" 
              value={processingFee} 
              onChange={(e) => setProcessingFee(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">EMI Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(monthlyEmi)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Processing Fee</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency((processingFee / 100) * purchaseAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Effective Interest Rate</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {((totalInterest / purchaseAmount) * (12 / tenure) * 100).toFixed(2)}% p.a.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Payment Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Principal', value: purchaseAmount, color: '#3b82f6' },
                { name: 'Interest & Charges', value: totalInterest, color: '#ef4444' }
              ]}
              centerText={`${formatCurrency(totalAmount)}\nTotal`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Important Information
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">EMI Conversion Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Convert large purchases into easy monthly installments</li>
                <li>Choose tenure from 3 to 24 months</li>
                <li>Fixed interest rate throughout the tenure</li>
                <li>No prepayment charges</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Eligibility</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Available on purchases above ₹1,000</li>
                <li>Credit card should be in good standing</li>
                <li>Subject to available credit limit</li>
                <li>Request within 30 days of purchase</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Things to Consider</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>EMI reduces available credit limit</li>
                <li>Processing fee is non-refundable</li>
                <li>GST applicable on interest and fees</li>
                <li>Foreclosure charges may apply</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};