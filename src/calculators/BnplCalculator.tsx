import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, CreditCard, Calendar, ArrowRight } from 'lucide-react';

export const BnplCalculator: React.FC = () => {
  const [purchaseAmount, setPurchaseAmount] = useState<number>(10000);
  const [tenure, setTenure] = useState<number>(3);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [processingFee, setProcessingFee] = useState<number>(0);
  const [latePaymentFee, setLatePaymentFee] = useState<number>(500);
  const [provider, setProvider] = useState<'custom' | 'zestmoney' | 'simpl' | 'lazypay' | 'flipkart'>('custom');
  
  // Calculated values
  const [installmentAmount, setInstallmentAmount] = useState<number>(0);
  const [totalPayable, setTotalPayable] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [apr, setApr] = useState<number>(0);
  const [installmentDates, setInstallmentDates] = useState<string[]>([]);
  
  // Set provider presets
  useEffect(() => {
    if (provider !== 'custom') {
      switch (provider) {
        case 'zestmoney':
          setInterestRate(24);
          setProcessingFee(2);
          setTenure(3);
          setDownPayment(0);
          break;
        case 'simpl':
          setInterestRate(0);
          setProcessingFee(0);
          setTenure(1);
          setDownPayment(0);
          break;
        case 'lazypay':
          setInterestRate(0);
          setProcessingFee(0);
          setTenure(1);
          setDownPayment(0);
          break;
        case 'flipkart':
          setInterestRate(14);
          setProcessingFee(1.5);
          setTenure(3);
          setDownPayment(0);
          break;
      }
    }
  }, [provider]);
  
  // Calculate installment details
  useEffect(() => {
    const processingFeeAmount = (purchaseAmount * processingFee) / 100;
    const loanAmount = purchaseAmount - downPayment;
    
    // Calculate installment amount with interest
    const monthlyRate = interestRate / 12 / 100;
    let installment = 0;
    
    if (interestRate === 0) {
      // No interest, simple division
      installment = loanAmount / tenure;
    } else {
      // With interest, use EMI formula
      installment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                   (Math.pow(1 + monthlyRate, tenure) - 1);
    }
    
    const totalPay = (installment * tenure) + downPayment + processingFeeAmount;
    const totalInt = totalPay - purchaseAmount - processingFeeAmount;
    
    setInstallmentAmount(installment);
    setTotalPayable(totalPay);
    setTotalInterest(totalInt);
    setTotalFees(processingFeeAmount);
    
    // Calculate APR (Annual Percentage Rate)
    // This is a simplified calculation
    const aprValue = (totalInt / loanAmount) * (12 / tenure) * 100;
    setApr(aprValue);
    
    // Generate installment dates
    const dates: string[] = [];
    const currentDate = new Date();
    
    for (let i = 1; i <= tenure; i++) {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() + i);
      dates.push(date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }));
    }
    
    setInstallmentDates(dates);
  }, [purchaseAmount, tenure, downPayment, interestRate, processingFee]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-[--primary-600]" />
          Buy Now, Pay Later Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              BNPL Provider
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  provider === 'custom'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setProvider('custom')}
              >
                Custom
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  provider === 'zestmoney'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setProvider('zestmoney')}
              >
                ZestMoney
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  provider === 'simpl'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setProvider('simpl')}
              >
                Simpl
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  provider === 'lazypay'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setProvider('lazypay')}
              >
                LazyPay
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  provider === 'flipkart'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setProvider('flipkart')}
              >
                Flipkart Pay Later
              </button>
            </div>
          </div>
          
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
              max="100000" 
              step="1000" 
              value={purchaseAmount} 
              onChange={(e) => setPurchaseAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="tenure" className="text-sm font-medium text-neutral-700">
                Tenure (Months)
              </label>
              <span className="text-sm text-neutral-500">
                {tenure} {tenure === 1 ? 'month' : 'months'}
              </span>
            </div>
            <input 
              type="range" 
              id="tenure"
              min="1" 
              max="12" 
              step="1" 
              value={tenure} 
              onChange={(e) => {
                setTenure(Number(e.target.value));
                if (provider !== 'custom') setProvider('custom');
              }}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="down-payment" className="text-sm font-medium text-neutral-700">
                Down Payment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(downPayment)}
              </span>
            </div>
            <input 
              type="range" 
              id="down-payment"
              min="0" 
              max={purchaseAmount * 0.5} 
              step="500" 
              value={downPayment} 
              onChange={(e) => {
                setDownPayment(Number(e.target.value));
                if (provider !== 'custom') setProvider('custom');
              }}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
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
                min="0" 
                max="36" 
                step="0.5" 
                value={interestRate} 
                onChange={(e) => {
                  setInterestRate(Number(e.target.value));
                  if (provider !== 'custom') setProvider('custom');
                }}
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
                max="5" 
                step="0.1" 
                value={processingFee} 
                onChange={(e) => {
                  setProcessingFee(Number(e.target.value));
                  if (provider !== 'custom') setProvider('custom');
                }}
                className="slider"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="late-payment-fee" className="text-sm font-medium text-neutral-700">
                Late Payment Fee (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(latePaymentFee)}
              </span>
            </div>
            <input 
              type="range" 
              id="late-payment-fee"
              min="0" 
              max="2000" 
              step="100" 
              value={latePaymentFee} 
              onChange={(e) => setLatePaymentFee(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Payment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Installment Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(installmentAmount)}</p>
              <p className="text-xs text-neutral-500 mt-1">Per month for {tenure} months</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Payable</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalPayable)}</p>
              <p className="text-xs text-neutral-500 mt-1">Including all fees and interest</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Down Payment</p>
              <p className="text-lg font-semibold text-neutral-900">{formatCurrency(downPayment)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
              <p className="text-lg font-semibold text-[--error-600]">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Processing Fee</p>
              <p className="text-lg font-semibold text-[--error-600]">{formatCurrency(totalFees)}</p>
            </div>
          </div>
          
          {interestRate > 0 && (
            <div className="mt-4 p-4 bg-[--warning-50] rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[--warning-700]">Effective APR</p>
                  <p className="text-lg font-semibold text-[--warning-800]">
                    {apr.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[--warning-700]">Extra Cost</p>
                  <p className="text-lg font-semibold text-[--warning-800]">
                    {formatCurrency(totalPayable - purchaseAmount)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[--primary-600]" />
            Payment Schedule
          </h2>
          <div className="mt-4 space-y-4">
            {downPayment > 0 && (
              <div className="flex items-center p-4 bg-[--primary-50] rounded-lg border border-[--primary-200]">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[--primary-100] flex items-center justify-center mr-4">
                  <span className="text-sm font-medium text-[--primary-700]">Now</span>
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-neutral-900">Down Payment</p>
                  <p className="text-xs text-neutral-500">Due immediately</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-[--primary-700]">{formatCurrency(downPayment)}</p>
                </div>
              </div>
            )}
            
            {installmentDates.map((date, index) => (
              <div key={index} className="flex items-center p-4 bg-white rounded-lg border border-neutral-200">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center mr-4">
                  <span className="text-sm font-medium text-neutral-700">{index + 1}</span>
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-neutral-900">Installment {index + 1}</p>
                  <p className="text-xs text-neutral-500">Due on {date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-neutral-900">{formatCurrency(installmentAmount)}</p>
                </div>
              </div>
            ))}
            
            {processingFee > 0 && (
              <div className="flex items-center p-4 bg-[--warning-50] rounded-lg border border-[--warning-200]">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[--warning-100] flex items-center justify-center mr-4">
                  <span className="text-sm font-medium text-[--warning-700]">Fee</span>
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-[--warning-800]">Processing Fee ({processingFee}%)</p>
                  <p className="text-xs text-[--warning-600]">Charged upfront</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-[--warning-700]">{formatCurrency(totalFees)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            BNPL Information
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">How BNPL Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-600">
                <li>Select BNPL at checkout on supported merchants</li>
                <li>Complete a quick eligibility check (usually instant)</li>
                <li>Choose your preferred repayment schedule</li>
                <li>Make the purchase with little or no money upfront</li>
                <li>Pay back in installments over the agreed period</li>
              </ol>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Popular BNPL Providers in India</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">ZestMoney</span>
                  <span className="text-neutral-600">Interest: 0-24% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Simpl</span>
                  <span className="text-neutral-600">Pay in 15-30 days, no interest</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">LazyPay</span>
                  <span className="text-neutral-600">15-day credit, no interest</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Flipkart Pay Later</span>
                  <span className="text-neutral-600">Interest: 0-14% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amazon Pay Later</span>
                  <span className="text-neutral-600">Interest: 0-18% p.a.</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Considerations</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Late payments can result in hefty fees ({formatCurrency(latePaymentFee)} per instance)</li>
                <li>Missed payments may negatively impact your credit score</li>
                <li>Some "interest-free" options may still charge processing fees</li>
                <li>BNPL debt can accumulate quickly if not managed properly</li>
                <li>Consider the effective APR ({apr.toFixed(2)}%) compared to credit cards</li>
                <li>Read the terms and conditions carefully before signing up</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BnplCalculator;