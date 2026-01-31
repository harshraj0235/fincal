import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const P2PLendingCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [tenure, setTenure] = useState<number>(12);
  const [platformFee, setPlatformFee] = useState<number>(2);
  const [defaultRisk, setDefaultRisk] = useState<number>(5);
  const [diversification, setDiversification] = useState<number>(20);
  const [taxBracket, setTaxBracket] = useState<number>(30);
  
  // Calculated values
  const [monthlyRepayment, setMonthlyRepayment] = useState<number>(0);
  const [totalRepayment, setTotalRepayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [platformFeeAmount, setPlatformFeeAmount] = useState<number>(0);
  const [expectedDefault, setExpectedDefault] = useState<number>(0);
  const [netReturns, setNetReturns] = useState<number>(0);
  const [effectiveInterestRate, setEffectiveInterestRate] = useState<number>(0);
  const [afterTaxReturns, setAfterTaxReturns] = useState<number>(0);
  
  useEffect(() => {
    // Calculate platform fee
    const feeAmount = (investmentAmount * platformFee) / 100;
    setPlatformFeeAmount(feeAmount);
    
    // Calculate monthly repayment (EMI)
    const monthlyRate = interestRate / 12 / 100;
    const emi = (investmentAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
               (Math.pow(1 + monthlyRate, tenure) - 1);
    
    setMonthlyRepayment(emi);
    
    // Calculate total repayment
    const totalRepay = emi * tenure;
    setTotalRepayment(totalRepay);
    
    // Calculate total interest
    const totalInt = totalRepay - investmentAmount;
    setTotalInterest(totalInt);
    
    // Calculate expected default amount
    const defaultAmount = (investmentAmount * defaultRisk) / 100;
    setExpectedDefault(defaultAmount);
    
    // Calculate net returns (after defaults and fees)
    const netReturn = totalInt - defaultAmount - feeAmount;
    setNetReturns(netReturn);
    
    // Calculate effective interest rate
    const effectiveRate = (netReturn / investmentAmount) * (12 / tenure) * 100;
    setEffectiveInterestRate(effectiveRate);
    
    // Calculate after-tax returns
    const taxAmount = netReturn * (taxBracket / 100);
    const afterTaxReturn = netReturn - taxAmount;
    setAfterTaxReturns(afterTaxReturn);
  }, [investmentAmount, interestRate, tenure, platformFee, defaultRisk, taxBracket]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Users className="w-5 h-5 mr-2 text-[--primary-600]" />
          P2P Lending Investment Details
        </h2>
        
        <div className="space-y-4">
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
              min="8" 
              max="36" 
              step="0.5" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="tenure" className="text-sm font-medium text-neutral-700">
                Tenure (Months)
              </label>
              <span className="text-sm text-neutral-500">
                {tenure} months
              </span>
            </div>
            <input 
              type="range" 
              id="tenure"
              min="3" 
              max="36" 
              step="1" 
              value={tenure} 
              onChange={(e) => setTenure(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="platform-fee" className="text-sm font-medium text-neutral-700">
                  Platform Fee (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {platformFee}%
                </span>
              </div>
              <input 
                type="range" 
                id="platform-fee"
                min="0" 
                max="5" 
                step="0.1" 
                value={platformFee} 
                onChange={(e) => setPlatformFee(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="default-risk" className="text-sm font-medium text-neutral-700">
                  Default Risk (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {defaultRisk}%
                </span>
              </div>
              <input 
                type="range" 
                id="default-risk"
                min="0" 
                max="20" 
                step="0.5" 
                value={defaultRisk} 
                onChange={(e) => setDefaultRisk(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="diversification" className="text-sm font-medium text-neutral-700">
                  Diversification (Borrowers)
                </label>
                <span className="text-sm text-neutral-500">
                  {diversification}
                </span>
              </div>
              <input 
                type="range" 
                id="diversification"
                min="1" 
                max="100" 
                step="1" 
                value={diversification} 
                onChange={(e) => setDiversification(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="tax-bracket" className="text-sm font-medium text-neutral-700">
                  Tax Bracket (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {taxBracket}%
                </span>
              </div>
              <input 
                type="range" 
                id="tax-bracket"
                min="5" 
                max="30" 
                step="5" 
                value={taxBracket} 
                onChange={(e) => setTaxBracket(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Investment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly Repayment</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(monthlyRepayment)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Net Returns</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(netReturns)}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Platform Fee</p>
              <p className="text-lg font-semibold text-[--error-600]">{formatCurrency(platformFeeAmount)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Expected Defaults</p>
              <p className="text-lg font-semibold text-[--error-600]">{formatCurrency(expectedDefault)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">After-Tax Returns</p>
              <p className="text-lg font-semibold text-[--success-600]">{formatCurrency(afterTaxReturns)}</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Effective Interest Rate</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {effectiveInterestRate.toFixed(2)}% p.a.
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Per Borrower Amount</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency(investmentAmount / diversification)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
            Returns Breakdown
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Investment', value: investmentAmount, color: '#3b82f6' },
                { name: 'Interest', value: totalInterest, color: '#22c55e' },
                { name: 'Platform Fee', value: -platformFeeAmount, color: '#f59e0b' },
                { name: 'Expected Defaults', value: -expectedDefault, color: '#ef4444' },
                { name: 'Tax', value: -(netReturns - afterTaxReturns), color: '#a855f7' }
              ]}
              centerText={`${formatCurrency(afterTaxReturns)}\nNet Profit`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            P2P Lending Information
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">How P2P Lending Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-600">
                <li>You register on a P2P lending platform regulated by RBI</li>
                <li>Complete KYC and link your bank account</li>
                <li>Deposit funds and choose borrowers to lend to</li>
                <li>The platform facilitates loan agreements and repayments</li>
                <li>You receive principal and interest as borrowers repay</li>
                <li>The platform charges a fee for its services</li>
              </ol>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Popular P2P Platforms in India</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Lendbox</span>
                  <span className="text-neutral-600">Returns: 12-18% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">LenDenClub</span>
                  <span className="text-neutral-600">Returns: 10-16% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Faircent</span>
                  <span className="text-neutral-600">Returns: 12-28% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">i2iFunding</span>
                  <span className="text-neutral-600">Returns: 12-25% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">RupeeCircle</span>
                  <span className="text-neutral-600">Returns: 12-18% p.a.</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--warning-50] rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-[--warning-600] mt-0.5 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-[--warning-900] mb-2">Risk Factors</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-[--warning-700]">
                    <li>Borrower defaults can significantly impact returns</li>
                    <li>No deposit insurance protection like bank deposits</li>
                    <li>Limited liquidity - difficult to exit before loan maturity</li>
                    <li>Regulatory changes may impact operations</li>
                    <li>Platform risk - if the P2P platform fails</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Best Practices</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li><strong>Diversify:</strong> Spread your investment across {diversification} or more borrowers</li>
                <li><strong>Start small:</strong> Begin with a small amount to understand the platform</li>
                <li><strong>Reinvest:</strong> Reinvest repayments to compound returns</li>
                <li><strong>Check credit scores:</strong> Lend to borrowers with better credit profiles</li>
                <li><strong>Understand tax implications:</strong> P2P returns are taxed as "Income from Other Sources"</li>
                <li><strong>Use auto-invest:</strong> Many platforms offer automated diversification tools</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">RBI Regulations for P2P Lending</h3>
          <div className="space-y-3 text-sm text-neutral-600">
            <p><span className="font-medium">Investment Limits:</span> Maximum ₹50 lakhs across all P2P platforms</p>
            <p><span className="font-medium">Exposure Limit:</span> Maximum ₹50,000 to a single borrower</p>
            <p><span className="font-medium">Tenure:</span> Loans cannot exceed 36 months</p>
            <p><span className="font-medium">Platform Requirements:</span> Minimum ₹2 crore net-owned funds, proper escrow mechanisms</p>
            <p><span className="font-medium">Transparency:</span> Platforms must disclose risks and borrower information</p>
            <p><span className="font-medium">Reporting:</span> Regular reporting to Credit Information Companies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default P2PLendingCalculator;