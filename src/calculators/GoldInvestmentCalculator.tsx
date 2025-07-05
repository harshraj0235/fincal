import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, TrendingUp, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

type GoldInvestmentType = 'physical' | 'digital' | 'sgb' | 'etf';

export const GoldInvestmentCalculator: React.FC = () => {
  const [investmentType, setInvestmentType] = useState<GoldInvestmentType>('physical');
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [goldPrice, setGoldPrice] = useState<number>(6000);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(5);
  const [annualAppreciation, setAnnualAppreciation] = useState<number>(8);
  
  const [goldQuantity, setGoldQuantity] = useState<number>(0);
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  const [annualizedReturn, setAnnualizedReturn] = useState<number>(0);
  
  useEffect(() => {
    // Calculate gold quantity
    let quantity = 0;
    let effectiveAmount = investmentAmount;
    
    // Apply charges based on investment type
    switch (investmentType) {
      case 'physical':
        effectiveAmount = investmentAmount * 0.97; // 3% making charges
        quantity = effectiveAmount / goldPrice;
        break;
      case 'digital':
        effectiveAmount = investmentAmount * 0.99; // 1% platform fee
        quantity = effectiveAmount / goldPrice;
        break;
      case 'sgb':
        quantity = investmentAmount / goldPrice;
        break;
      case 'etf':
        effectiveAmount = investmentAmount * 0.995; // 0.5% expense ratio
        quantity = effectiveAmount / goldPrice;
        break;
    }
    
    setGoldQuantity(quantity);
    
    // Calculate future value
    let appreciationRate = annualAppreciation / 100;
    let futureGoldPrice = goldPrice * Math.pow(1 + appreciationRate, investmentPeriod);
    let calculatedFutureValue = quantity * futureGoldPrice;
    
    // Add additional benefits for SGB
    if (investmentType === 'sgb') {
      // Add 2.5% annual interest for SGB
      const interestAmount = investmentAmount * 0.025 * investmentPeriod;
      calculatedFutureValue += interestAmount;
    }
    
    setFutureValue(calculatedFutureValue);
    setTotalReturns(calculatedFutureValue - investmentAmount);
    
    // Calculate annualized return
    const annualizedReturnRate = Math.pow(calculatedFutureValue / investmentAmount, 1 / investmentPeriod) - 1;
    setAnnualizedReturn(annualizedReturnRate * 100);
  }, [investmentType, investmentAmount, goldPrice, investmentPeriod, annualAppreciation]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
          Gold Investment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Investment Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setInvestmentType('physical')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  investmentType === 'physical'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Physical Gold
              </button>
              <button
                onClick={() => setInvestmentType('digital')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  investmentType === 'digital'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Digital Gold
              </button>
              <button
                onClick={() => setInvestmentType('sgb')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  investmentType === 'sgb'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Sovereign Gold Bond
              </button>
              <button
                onClick={() => setInvestmentType('etf')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  investmentType === 'etf'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Gold ETF
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="investment-amount" className="text-sm font-medium text-neutral-700">
                Investment Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(investmentAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="investment-amount"
              min="10000" 
              max="1000000" 
              step="10000" 
              value={investmentAmount} 
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="gold-price" className="text-sm font-medium text-neutral-700">
                Gold Price (₹/gram)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(goldPrice)}
              </span>
            </div>
            <input 
              type="range" 
              id="gold-price"
              min="5000" 
              max="8000" 
              step="100" 
              value={goldPrice} 
              onChange={(e) => setGoldPrice(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="investment-period" className="text-sm font-medium text-neutral-700">
                Investment Period (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {investmentPeriod} years
              </span>
            </div>
            <input 
              type="range" 
              id="investment-period"
              min="1" 
              max="15" 
              value={investmentPeriod} 
              onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="annual-appreciation" className="text-sm font-medium text-neutral-700">
                Expected Annual Appreciation (%)
              </label>
              <span className="text-sm text-neutral-500">
                {annualAppreciation}%
              </span>
            </div>
            <input 
              type="range" 
              id="annual-appreciation"
              min="0" 
              max="15" 
              step="0.5" 
              value={annualAppreciation} 
              onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Investment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Gold Quantity</p>
              <p className="text-xl font-bold text-neutral-900">{goldQuantity.toFixed(2)} grams</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Future Value</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(futureValue)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Returns</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalReturns)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Annualized Return</p>
              <p className="text-xl font-bold text-[--success-600]">{annualizedReturn.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Investment Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Investment Amount', value: investmentAmount, color: '#3b82f6' },
                { name: 'Returns', value: totalReturns, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(futureValue)}\nFuture Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Investment Comparison
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Physical Gold</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Tangible asset with emotional value</li>
                <li>Making charges (3-15%)</li>
                <li>Storage and security concerns</li>
                <li>Liquidity challenges</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Digital Gold</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>No storage concerns</li>
                <li>Lower making charges (1-3%)</li>
                <li>Easy liquidity</li>
                <li>Option to convert to physical gold</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Sovereign Gold Bond</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>2.5% annual interest</li>
                <li>Capital gains tax exemption on maturity</li>
                <li>Government backed security</li>
                <li>8-year lock-in (early exit after 5 years)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Gold ETF</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>High liquidity through stock exchanges</li>
                <li>Low expense ratio (0.5-1%)</li>
                <li>No wealth tax or VAT</li>
                <li>Demat account required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};