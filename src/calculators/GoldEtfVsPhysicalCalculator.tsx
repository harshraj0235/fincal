import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/calculatorUtils';
import { IndianRupee, TrendingUp, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import SEOHelmet from '../components/SEOHelmet';

export const GoldEtfVsPhysicalCalculator: React.FC = () => {
  // Investment details
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(5);
  const [goldAppreciation, setGoldAppreciation] = useState<number>(8);
  
  // Physical gold details
  const [makingCharges, setMakingCharges] = useState<number>(10);
  const [wastage, setWastage] = useState<number>(3);
  const [storageCost, setStorageCost] = useState<number>(1000);
  const [buybackDiscount, setBuybackDiscount] = useState<number>(5);
  
  // Gold ETF details
  const [expenseRatio, setExpenseRatio] = useState<number>(0.5);
  const [brokerageFee, setBrokerageFee] = useState<number>(0.1);
  const [exitLoad, setExitLoad] = useState<number>(0);
  const [taxBracket, setTaxBracket] = useState<number>(30);
  
  // Calculated values
  const [physicalGoldValue, setPhysicalGoldValue] = useState<number>(0);
  const [etfValue, setEtfValue] = useState<number>(0);
  const [physicalGoldReturns, setPhysicalGoldReturns] = useState<number>(0);
  const [etfReturns, setEtfReturns] = useState<number>(0);
  const [physicalGoldCagr, setPhysicalGoldCagr] = useState<number>(0);
  const [etfCagr, setEtfCagr] = useState<number>(0);
  const [physicalGoldTax, setPhysicalGoldTax] = useState<number>(0);
  const [etfTax, setEtfTax] = useState<number>(0);
  const [yearlyBreakup, setYearlyBreakup] = useState<Array<{
    year: number;
    physicalGoldValue: number;
    etfValue: number;
  }>>([]);
  
  useEffect(() => {
    // Calculate effective investment in physical gold
    const makingChargesAmount = (investmentAmount * makingCharges) / 100;
    const wastageAmount = (investmentAmount * wastage) / 100;
    const effectivePhysicalGoldInvestment = investmentAmount - makingChargesAmount - wastageAmount;
    
    // Calculate effective investment in Gold ETF
    const brokerageAmount = (investmentAmount * brokerageFee) / 100;
    const effectiveEtfInvestment = investmentAmount - brokerageAmount;
    
    // Initialize yearly breakup data
    const breakup: Array<{
      year: number;
      physicalGoldValue: number;
      etfValue: number;
    }> = [];
    
    let currentPhysicalGoldValue = effectivePhysicalGoldInvestment;
    let currentEtfValue = effectiveEtfInvestment;
    
    for (let year = 1; year <= investmentPeriod; year++) {
      // Physical gold appreciation
      currentPhysicalGoldValue = currentPhysicalGoldValue * (1 + goldAppreciation / 100);
      // Subtract annual storage cost
      currentPhysicalGoldValue -= storageCost;
      
      // ETF appreciation (reduced by expense ratio)
      currentEtfValue = currentEtfValue * (1 + (goldAppreciation - expenseRatio) / 100);
      
      // Add to yearly breakup
      breakup.push({
        year,
        physicalGoldValue: currentPhysicalGoldValue,
        etfValue: currentEtfValue
      });
    }
    
    // Apply buyback discount to physical gold
    const finalPhysicalGoldValue = currentPhysicalGoldValue * (1 - buybackDiscount / 100);
    
    // Apply exit load to ETF
    const finalEtfValue = currentEtfValue * (1 - exitLoad / 100);
    
    // Calculate returns
    const physicalGoldReturn = finalPhysicalGoldValue - investmentAmount;
    const etfReturn = finalEtfValue - investmentAmount;
    
    // Calculate CAGR
    const physicalGoldCagrValue = (Math.pow(finalPhysicalGoldValue / investmentAmount, 1 / investmentPeriod) - 1) * 100;
    const etfCagrValue = (Math.pow(finalEtfValue / investmentAmount, 1 / investmentPeriod) - 1) * 100;
    
    // Calculate taxes
    // For physical gold: LTCG at 20% with indexation (simplified)
    const inflationIndexFactor = Math.pow(1.05, investmentPeriod); // Assuming 5% inflation for indexation
    const indexedCostOfPhysicalGold = investmentAmount * inflationIndexFactor;
    const taxableGainPhysical = Math.max(0, finalPhysicalGoldValue - indexedCostOfPhysicalGold);
    const physicalGoldTaxAmount = taxableGainPhysical * 0.2;
    
    // For ETF: LTCG at 10% without indexation above ₹1 lakh (for equity)
    const taxableGainEtf = Math.max(0, etfReturn - 100000);
    const etfTaxAmount = taxableGainEtf > 0 ? taxableGainEtf * 0.1 : 0;
    
    setPhysicalGoldValue(finalPhysicalGoldValue);
    setEtfValue(finalEtfValue);
    setPhysicalGoldReturns(physicalGoldReturn);
    setEtfReturns(etfReturn);
    setPhysicalGoldCagr(physicalGoldCagrValue);
    setEtfCagr(etfCagrValue);
    setPhysicalGoldTax(physicalGoldTaxAmount);
    setEtfTax(etfTaxAmount);
    setYearlyBreakup(breakup);
    
  }, [
    investmentAmount,
    investmentPeriod,
    goldAppreciation,
    makingCharges,
    wastage,
    storageCost,
    buybackDiscount,
    expenseRatio,
    brokerageFee,
    exitLoad,
    taxBracket
  ]);
  
  return (
    <>
    <SEOHelmet
      title="Gold ETF vs Physical Gold Calculator India 2026 - Return & Tax Comparison | MoneyCal"
      description="Compare Gold ETF vs physical gold returns in India with making charges, expense ratio, storage cost, buyback discount, and tax impact."
      keywords="gold etf vs physical gold calculator india, gold investment comparison with tax, physical gold making charges calculator, gold etf return calculator india"
      url="/calculators/gold-etf-vs-physical-calculator"
    />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
          Investment Details
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
              max="20" 
              step="1" 
              value={investmentPeriod} 
              onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="gold-appreciation" className="text-sm font-medium text-neutral-700">
                Expected Gold Appreciation (% p.a.)
              </label>
              <span className="text-sm text-neutral-500">
                {goldAppreciation}%
              </span>
            </div>
            <input 
              type="range" 
              id="gold-appreciation"
              min="0" 
              max="15" 
              step="0.5" 
              value={goldAppreciation} 
              onChange={(e) => setGoldAppreciation(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-md font-medium text-neutral-900 mb-3">Physical Gold Parameters</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="making-charges" className="text-sm font-medium text-neutral-700">
                    Making Charges (%)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {makingCharges}%
                  </span>
                </div>
                <input 
                  type="range" 
                  id="making-charges"
                  min="0" 
                  max="25" 
                  step="0.5" 
                  value={makingCharges} 
                  onChange={(e) => setMakingCharges(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="wastage" className="text-sm font-medium text-neutral-700">
                    Wastage (%)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {wastage}%
                  </span>
                </div>
                <input 
                  type="range" 
                  id="wastage"
                  min="0" 
                  max="10" 
                  step="0.5" 
                  value={wastage} 
                  onChange={(e) => setWastage(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="storage-cost" className="text-sm font-medium text-neutral-700">
                    Annual Storage Cost (₹)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {formatCurrency(storageCost)}
                  </span>
                </div>
                <input 
                  type="range" 
                  id="storage-cost"
                  min="0" 
                  max="5000" 
                  step="100" 
                  value={storageCost} 
                  onChange={(e) => setStorageCost(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="buyback-discount" className="text-sm font-medium text-neutral-700">
                    Buyback Discount (%)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {buybackDiscount}%
                  </span>
                </div>
                <input 
                  type="range" 
                  id="buyback-discount"
                  min="0" 
                  max="15" 
                  step="0.5" 
                  value={buybackDiscount} 
                  onChange={(e) => setBuybackDiscount(Number(e.target.value))}
                  className="slider"
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-md font-medium text-neutral-900 mb-3">Gold ETF Parameters</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="expense-ratio" className="text-sm font-medium text-neutral-700">
                    Expense Ratio (% p.a.)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {expenseRatio}%
                  </span>
                </div>
                <input 
                  type="range" 
                  id="expense-ratio"
                  min="0.1" 
                  max="1.5" 
                  step="0.1" 
                  value={expenseRatio} 
                  onChange={(e) => setExpenseRatio(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="brokerage-fee" className="text-sm font-medium text-neutral-700">
                    Brokerage Fee (%)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {brokerageFee}%
                  </span>
                </div>
                <input 
                  type="range" 
                  id="brokerage-fee"
                  min="0" 
                  max="0.5" 
                  step="0.05" 
                  value={brokerageFee} 
                  onChange={(e) => setBrokerageFee(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="exit-load" className="text-sm font-medium text-neutral-700">
                    Exit Load (%)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {exitLoad}%
                  </span>
                </div>
                <input 
                  type="range" 
                  id="exit-load"
                  min="0" 
                  max="1" 
                  step="0.1" 
                  value={exitLoad} 
                  onChange={(e) => setExitLoad(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="tax-bracket" className="text-sm font-medium text-neutral-700">
                    Income Tax Bracket (%)
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
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Investment Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Physical Gold Value</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(physicalGoldValue)}</p>
              <p className="text-sm text-[--primary-600]">CAGR: {physicalGoldCagr.toFixed(2)}%</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Gold ETF Value</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(etfValue)}</p>
              <p className="text-sm text-[--primary-600]">CAGR: {etfCagr.toFixed(2)}%</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Physical Gold Returns</p>
              <p className={`text-xl font-bold ${physicalGoldReturns >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                {formatCurrency(physicalGoldReturns)}
              </p>
              <p className="text-sm text-neutral-600">After Tax: {formatCurrency(physicalGoldReturns - physicalGoldTax)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Gold ETF Returns</p>
              <p className={`text-xl font-bold ${etfReturns >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                {formatCurrency(etfReturns)}
              </p>
              <p className="text-sm text-neutral-600">After Tax: {formatCurrency(etfReturns - etfTax)}</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg">
            <h3 className="text-lg font-medium text-neutral-900 mb-3">Verdict</h3>
            <div className="flex items-center">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 ${
                (etfReturns - etfTax) > (physicalGoldReturns - physicalGoldTax)
                  ? 'bg-[--success-100] text-[--success-700]' 
                  : 'bg-[--primary-100] text-[--primary-700]'
              }`}>
                <span className="text-xl">{(etfReturns - etfTax) > (physicalGoldReturns - physicalGoldTax) ? '📈' : '🪙'}</span>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">
                  {(etfReturns - etfTax) > (physicalGoldReturns - physicalGoldTax)
                    ? 'Gold ETF is more profitable' 
                    : 'Physical Gold is more profitable'}
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  {(etfReturns - etfTax) > (physicalGoldReturns - physicalGoldTax)
                    ? `You earn ${formatCurrency((etfReturns - etfTax) - (physicalGoldReturns - physicalGoldTax))} more with Gold ETF` 
                    : `You earn ${formatCurrency((physicalGoldReturns - physicalGoldTax) - (etfReturns - etfTax))} more with Physical Gold`}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
            Value Comparison Over Time
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Investment Amount', value: investmentAmount, color: '#64748b' },
                { name: 'Physical Gold Growth', value: physicalGoldValue - investmentAmount, color: '#f59e0b' },
                { name: 'Gold ETF Growth', value: etfValue - investmentAmount, color: '#3b82f6' }
              ]}
              centerText={`${formatCurrency(Math.max(physicalGoldValue, etfValue))}\nBest Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Comparison Insights
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Physical Gold Advantages</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Tangible asset with emotional and cultural value</li>
                <li>Can be used as jewelry</li>
                <li>No dependency on financial markets or systems</li>
                <li>Can be passed down as heirloom</li>
                <li>No counterparty risk</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Gold ETF Advantages</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>No making charges or wastage</li>
                <li>No storage or security concerns</li>
                <li>High liquidity and ease of buying/selling</li>
                <li>Transparent pricing</li>
                <li>Can be bought in small quantities</li>
                <li>No quality concerns</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Tax Implications</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li><strong>Physical Gold:</strong> 20% LTCG tax with indexation benefit after 3 years</li>
                <li><strong>Gold ETF:</strong> 10% LTCG tax without indexation benefit after 1 year (above ₹1 lakh)</li>
                <li>Short-term gains for both are taxed at your income tax slab rate</li>
                <li>GST of 3% applies on purchase of physical gold</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="mt-10">
      <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3">
        <h2 className="text-2xl font-bold text-neutral-900">Gold ETF vs Physical Gold: making a return-first decision</h2>
        <p className="text-neutral-700">
          Gold buyers in India often compare emotional preference with investment efficiency. Physical gold can include making charges, wastage, storage risk, and
          buyback discount. Gold ETFs avoid most of these frictions but include expense ratio and market execution costs. This calculator helps compare both tracks on
          one screen by modeling all major cost layers, so users searching <strong>gold ETF vs physical gold ROI calculator India</strong> can make evidence-based decisions.
        </p>
        <p className="text-neutral-700">
          Tax rules can materially change final outcomes. Holding period and product structure determine tax treatment, so every investor should verify tax assumptions
          against current law and personal slab before executing large allocations. Use this page as an estimation framework, not a legal opinion. For broader planning,
          combine gold allocation with diversified assets using the <Link to="/calculators/asset-allocation-calculator" className="underline">Asset Allocation Calculator</Link>{' '}
          and <Link to="/calculators/compound-interest-calculator" className="underline">Compound Interest Calculator</Link>.
        </p>
        <p className="text-neutral-700">
          Physical gold may still suit gifting and cultural use-cases, while ETFs can be preferred for transparent pricing and rebalancing. If your goal is pure
          investment efficiency, compare post-cost, post-tax CAGR and liquidity speed instead of headline annual return. During volatile periods, portfolio role matters:
          gold as a hedge, not necessarily a growth substitute.
        </p>
        <p className="text-neutral-700">
          For user trust, cross-check product and market details with official resources such as{' '}
          <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">SEBI</a> and{' '}
          <a href="https://www.nseindia.com/" target="_blank" rel="noopener noreferrer" className="underline">NSE</a>. If using digital gold or ETF platforms, review
          total cost disclosures and execution terms before investing.
        </p>
      </div>
    </section>
    </>
  );
};

export default GoldEtfVsPhysicalCalculator;