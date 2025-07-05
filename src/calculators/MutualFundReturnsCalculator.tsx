import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, TrendingUp, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const MutualFundReturnsCalculator: React.FC = () => {
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(5);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [existingInvestment, setExistingInvestment] = useState<number>(0);
  const [existingPeriod, setExistingPeriod] = useState<number>(1);
  
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [absoluteReturn, setAbsoluteReturn] = useState<number>(0);
  const [cagr, setCagr] = useState<number>(0);
  const [xirr, setXirr] = useState<number>(0);
  
  useEffect(() => {
    let calculatedTotalInvestment = 0;
    let calculatedMaturityAmount = 0;
    
    if (investmentType === 'sip') {
      // Calculate for SIP
      const monthlyRate = expectedReturn / 12 / 100;
      const months = investmentPeriod * 12;
      
      // Future value of SIP
      calculatedMaturityAmount = investmentAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      calculatedTotalInvestment = investmentAmount * months;
      
      // Add existing investment with its growth
      if (existingInvestment > 0) {
        const existingGrowth = existingInvestment * Math.pow(1 + expectedReturn / 100, investmentPeriod);
        calculatedMaturityAmount += existingGrowth;
        calculatedTotalInvestment += existingInvestment;
      }
    } else {
      // Calculate for lumpsum
      calculatedTotalInvestment = investmentAmount;
      calculatedMaturityAmount = investmentAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
      
      // Add existing investment with its growth
      if (existingInvestment > 0) {
        const totalPeriod = existingPeriod + investmentPeriod;
        const existingGrowth = existingInvestment * Math.pow(1 + expectedReturn / 100, totalPeriod);
        calculatedMaturityAmount += existingGrowth;
        calculatedTotalInvestment += existingInvestment;
      }
    }
    
    const calculatedReturns = calculatedMaturityAmount - calculatedTotalInvestment;
    const calculatedAbsoluteReturn = (calculatedReturns / calculatedTotalInvestment) * 100;
    
    // Calculate CAGR
    const calculatedCagr = (Math.pow(calculatedMaturityAmount / calculatedTotalInvestment, 1 / investmentPeriod) - 1) * 100;
    
    // Approximate XIRR (simplification)
    const calculatedXirr = investmentType === 'sip' ? 
      ((Math.pow(calculatedMaturityAmount / (calculatedTotalInvestment / 2), 1 / investmentPeriod) - 1) * 100) : 
      calculatedCagr;
    
    setTotalInvestment(calculatedTotalInvestment);
    setMaturityAmount(calculatedMaturityAmount);
    setEstimatedReturns(calculatedReturns);
    setAbsoluteReturn(calculatedAbsoluteReturn);
    setCagr(calculatedCagr);
    setXirr(calculatedXirr);
  }, [investmentType, investmentAmount, investmentPeriod, expectedReturn, existingInvestment, existingPeriod]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
          Investment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Investment Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  investmentType === 'sip'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setInvestmentType('sip')}
              >
                SIP
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  investmentType === 'lumpsum'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setInvestmentType('lumpsum')}
              >
                Lumpsum
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="investment-amount" className="text-sm font-medium text-neutral-700">
                {investmentType === 'sip' ? 'Monthly Investment (₹)' : 'Investment Amount (₹)'}
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(investmentAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="investment-amount"
              min={investmentType === 'sip' ? '500' : '1000'} 
              max={investmentType === 'sip' ? '100000' : '10000000'} 
              step={investmentType === 'sip' ? '500' : '10000'} 
              value={investmentAmount} 
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
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
              max="30" 
              step="1" 
              value={investmentPeriod} 
              onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="expected-return" className="text-sm font-medium text-neutral-700">
                Expected Annual Return (%)
              </label>
              <span className="text-sm text-neutral-500">
                {expectedReturn}%
              </span>
            </div>
            <input 
              type="range" 
              id="expected-return"
              min="1" 
              max="30" 
              step="0.5" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="pt-4 border-t border-neutral-200">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Existing Investment (Optional)</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="existing-investment" className="text-sm font-medium text-neutral-700">
                    Existing Investment Amount (₹)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {formatCurrency(existingInvestment)}
                  </span>
                </div>
                <input 
                  type="range" 
                  id="existing-investment"
                  min="0" 
                  max="5000000" 
                  step="10000" 
                  value={existingInvestment} 
                  onChange={(e) => setExistingInvestment(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              {existingInvestment > 0 && (
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="existing-period" className="text-sm font-medium text-neutral-700">
                      Existing Investment Period (Years)
                    </label>
                    <span className="text-sm text-neutral-500">
                      {existingPeriod} years
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="existing-period"
                    min="0.5" 
                    max="20" 
                    step="0.5" 
                    value={existingPeriod} 
                    onChange={(e) => setExistingPeriod(Number(e.target.value))}
                    className="slider"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Returns Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Investment</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Estimated Returns</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(estimatedReturns)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Maturity Amount</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(maturityAmount)}</p>
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
                { name: 'Total Investment', value: totalInvestment, color: '#3b82f6' },
                { name: 'Estimated Returns', value: estimatedReturns, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityAmount)}\nTotal Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Return Metrics
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Return Metrics</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Absolute Return</span>
                  <span className="font-medium">{absoluteReturn.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>CAGR (Compound Annual Growth Rate)</span>
                  <span className="font-medium">{cagr.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>XIRR (Extended Internal Rate of Return)</span>
                  <span className="font-medium">{xirr.toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Understanding Return Metrics</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><strong>Absolute Return:</strong> Simple percentage gain or loss on investment without considering time period</p>
                <p><strong>CAGR:</strong> Annualized return that smooths out the volatility over the investment period</p>
                <p><strong>XIRR:</strong> Takes into account the timing and amount of cash flows, giving a more accurate return for SIPs</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Investment Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Past performance is not indicative of future results</li>
                <li>Diversify across asset classes and fund categories</li>
                <li>Consider your risk tolerance and investment horizon</li>
                <li>Review and rebalance your portfolio periodically</li>
                <li>Stay invested for the long term to benefit from compounding</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};