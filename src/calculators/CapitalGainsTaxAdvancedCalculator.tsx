import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, TrendingUp } from 'lucide-react';
import { BarChart } from '../components/BarChart';

type AssetType = 'equity' | 'debt' | 'property' | 'gold' | 'crypto';
type HoldingPeriod = 'shortTerm' | 'longTerm';

export const CapitalGainsTaxAdvancedCalculator: React.FC = () => {
  const [assetType, setAssetType] = useState<AssetType>('equity');
  const [purchasePrice, setPurchasePrice] = useState<number>(100000);
  const [salePrice, setSalePrice] = useState<number>(150000);
  const [purchaseDate, setPurchaseDate] = useState<string>('2023-01-01');
  const [saleDate, setSaleDate] = useState<string>('2025-01-01');
  const [holdingPeriod, setHoldingPeriod] = useState<HoldingPeriod>('longTerm');
  const [indexationBenefit, setIndexationBenefit] = useState<boolean>(true);
  const [taxBracket, setTaxBracket] = useState<number>(30);
  
  const [gainAmount, setGainAmount] = useState<number>(0);
  const [indexedCost, setIndexedCost] = useState<number>(0);
  const [indexedGain, setIndexedGain] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState<number>(0);
  const [taxSavingsFromIndexation, setTaxSavingsFromIndexation] = useState<number>(0);
  
  // Cost inflation indices (simplified for demonstration)
  const costInflationIndices: Record<string, number> = {
    '2020': 301,
    '2021': 317,
    '2022': 331,
    '2023': 348,
    '2024': 365,
    '2025': 383
  };
  
  useEffect(() => {
    // Determine holding period based on dates
    const purchase = new Date(purchaseDate);
    const sale = new Date(saleDate);
    const holdingPeriodInMonths = (sale.getFullYear() - purchase.getFullYear()) * 12 + 
                                 (sale.getMonth() - purchase.getMonth());
    
    let isLongTerm = false;
    switch (assetType) {
      case 'equity':
        isLongTerm = holdingPeriodInMonths >= 12;
        break;
      case 'debt':
        isLongTerm = holdingPeriodInMonths >= 36;
        break;
      case 'property':
        isLongTerm = holdingPeriodInMonths >= 24;
        break;
      case 'gold':
        isLongTerm = holdingPeriodInMonths >= 36;
        break;
      case 'crypto':
        isLongTerm = false; // Always short-term as per current laws
        break;
    }
    
    setHoldingPeriod(isLongTerm ? 'longTerm' : 'shortTerm');
    
    // Calculate capital gain
    const gain = salePrice - purchasePrice;
    setGainAmount(gain);
    
    // Calculate indexed cost of acquisition (for applicable assets)
    const purchaseYear = purchase.getFullYear().toString();
    const saleYear = sale.getFullYear().toString();
    
    const purchaseYearIndex = costInflationIndices[purchaseYear] || 301;
    const saleYearIndex = costInflationIndices[saleYear] || 383;
    
    const indexedCostOfAcquisition = purchasePrice * (saleYearIndex / purchaseYearIndex);
    setIndexedCost(indexedCostOfAcquisition);
    
    const indexedGainAmount = salePrice - indexedCostOfAcquisition;
    setIndexedGain(Math.max(0, indexedGainAmount));
    
    // Calculate tax based on asset type and holding period
    let tax = 0;
    let taxWithoutIndexation = 0;
    
    if (gain > 0) {
      if (isLongTerm) {
        switch (assetType) {
          case 'equity':
            // 10% above 1L for long-term equity gains
            tax = Math.max(0, gain - 100000) * 0.1;
            break;
          case 'debt':
          case 'gold':
            // 20% with indexation for long-term debt and gold
            tax = indexationBenefit ? Math.max(0, indexedGainAmount) * 0.2 : gain * 0.2;
            taxWithoutIndexation = gain * 0.2;
            break;
          case 'property':
            // 20% with indexation for long-term property
            tax = indexationBenefit ? Math.max(0, indexedGainAmount) * 0.2 : gain * 0.2;
            taxWithoutIndexation = gain * 0.2;
            break;
          case 'crypto':
            // 30% flat for crypto (no long-term benefit)
            tax = gain * 0.3;
            break;
        }
      } else {
        // Short-term capital gains
        switch (assetType) {
          case 'equity':
            // 15% for short-term equity gains
            tax = gain * 0.15;
            break;
          case 'debt':
          case 'gold':
          case 'property':
            // Taxed at income tax slab rate
            tax = gain * (taxBracket / 100);
            break;
          case 'crypto':
            // 30% flat for crypto
            tax = gain * 0.3;
            break;
        }
      }
    }
    
    setTaxAmount(tax);
    setEffectiveTaxRate(gain > 0 ? (tax / gain) * 100 : 0);
    
    // Calculate tax savings from indexation
    if (isLongTerm && (assetType === 'debt' || assetType === 'gold' || assetType === 'property') && indexationBenefit) {
      setTaxSavingsFromIndexation(Math.max(0, taxWithoutIndexation - tax));
    } else {
      setTaxSavingsFromIndexation(0);
    }
    
  }, [assetType, purchasePrice, salePrice, purchaseDate, saleDate, indexationBenefit, taxBracket]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Capital Gains Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Asset Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  assetType === 'equity'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setAssetType('equity')}
              >
                Equity
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  assetType === 'debt'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setAssetType('debt')}
              >
                Debt
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  assetType === 'property'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setAssetType('property')}
              >
                Property
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  assetType === 'gold'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setAssetType('gold')}
              >
                Gold
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  assetType === 'crypto'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setAssetType('crypto')}
              >
                Crypto
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="purchase-price" className="text-sm font-medium text-neutral-700">
                Purchase Price (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(purchasePrice)}
              </span>
            </div>
            <input 
              type="range" 
              id="purchase-price"
              min="1000" 
              max="10000000" 
              step="1000" 
              value={purchasePrice} 
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="sale-price" className="text-sm font-medium text-neutral-700">
                Sale Price (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(salePrice)}
              </span>
            </div>
            <input 
              type="range" 
              id="sale-price"
              min="1000" 
              max="10000000" 
              step="1000" 
              value={salePrice} 
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="purchase-date" className="block text-sm font-medium text-neutral-700 mb-2">
                Purchase Date
              </label>
              <input
                type="date"
                id="purchase-date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="input"
                max={saleDate}
              />
            </div>
            
            <div>
              <label htmlFor="sale-date" className="block text-sm font-medium text-neutral-700 mb-2">
                Sale Date
              </label>
              <input
                type="date"
                id="sale-date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                className="input"
                min={purchaseDate}
              />
            </div>
          </div>
          
          {(assetType === 'debt' || assetType === 'property' || assetType === 'gold') && holdingPeriod === 'longTerm' && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="indexation"
                checked={indexationBenefit}
                onChange={(e) => setIndexationBenefit(e.target.checked)}
                className="rounded border-neutral-300 text-[--primary-600] focus:ring-[--primary-500]"
              />
              <label htmlFor="indexation" className="text-sm font-medium text-neutral-700">
                Apply Indexation Benefit
              </label>
            </div>
          )}
          
          {(assetType === 'debt' || assetType === 'property' || assetType === 'gold') && holdingPeriod === 'shortTerm' && (
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">
                Income Tax Bracket
              </label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    taxBracket === 5
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                  onClick={() => setTaxBracket(5)}
                >
                  5%
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    taxBracket === 20
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                  onClick={() => setTaxBracket(20)}
                >
                  20%
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    taxBracket === 30
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                  onClick={() => setTaxBracket(30)}
                >
                  30%
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Tax Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Capital Gains</p>
              <p className={`text-xl font-bold ${gainAmount >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                {formatCurrency(gainAmount)}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Tax Amount</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(taxAmount)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Effective Tax Rate</p>
              <p className="text-xl font-bold text-neutral-900">{effectiveTaxRate.toFixed(2)}%</p>
            </div>
          </div>
          
          {(assetType === 'debt' || assetType === 'property' || assetType === 'gold') && 
           holdingPeriod === 'longTerm' && indexationBenefit && (
            <div className="mt-4 p-4 bg-[--success-50] rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">Indexed Cost of Acquisition</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {formatCurrency(indexedCost)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Tax Savings from Indexation</p>
                  <p className="text-lg font-semibold text-[--success-600]">
                    {formatCurrency(taxSavingsFromIndexation)}
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
            <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
            Tax Comparison
          </h2>
          <div className="mt-4 h-64">
            <BarChart 
              data={[
                { 
                  label: 'Capital Gains', 
                  value: gainAmount,
                  color: '#3b82f6'
                },
                { 
                  label: 'Tax Amount', 
                  value: taxAmount,
                  color: '#ef4444'
                },
                ...(indexationBenefit && holdingPeriod === 'longTerm' && 
                  (assetType === 'debt' || assetType === 'property' || assetType === 'gold') ? 
                  [{ 
                    label: 'Tax Without Indexation', 
                    value: gainAmount * 0.2,
                    color: '#f59e0b'
                  }] : [])
              ]}
              xKey="label"
              yKey="value"
              color="color"
              xLabel="Amount Type"
              yLabel="Amount (₹)"
              formatY={(value) => formatCurrency(value)}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Tax Guidelines for {assetType.charAt(0).toUpperCase() + assetType.slice(1)}
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Holding Period Classification</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                {assetType === 'equity' && (
                  <>
                    <p><span className="font-medium">Short Term:</span> Less than 12 months</p>
                    <p><span className="font-medium">Long Term:</span> 12 months or more</p>
                  </>
                )}
                {(assetType === 'debt' || assetType === 'gold') && (
                  <>
                    <p><span className="font-medium">Short Term:</span> Less than 36 months</p>
                    <p><span className="font-medium">Long Term:</span> 36 months or more</p>
                  </>
                )}
                {assetType === 'property' && (
                  <>
                    <p><span className="font-medium">Short Term:</span> Less than 24 months</p>
                    <p><span className="font-medium">Long Term:</span> 24 months or more</p>
                  </>
                )}
                {assetType === 'crypto' && (
                  <>
                    <p><span className="font-medium">All crypto gains:</span> Treated as short-term gains regardless of holding period</p>
                  </>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Tax Rates</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                {assetType === 'equity' && (
                  <>
                    <p><span className="font-medium">Short Term:</span> 15% of gains</p>
                    <p><span className="font-medium">Long Term:</span> 10% of gains exceeding ₹1 lakh (without indexation)</p>
                  </>
                )}
                {(assetType === 'debt' || assetType === 'gold') && (
                  <>
                    <p><span className="font-medium">Short Term:</span> Taxed as per income tax slab rate</p>
                    <p><span className="font-medium">Long Term:</span> 20% with indexation benefit</p>
                  </>
                )}
                {assetType === 'property' && (
                  <>
                    <p><span className="font-medium">Short Term:</span> Taxed as per income tax slab rate</p>
                    <p><span className="font-medium">Long Term:</span> 20% with indexation benefit</p>
                    <p><span className="font-medium">Section 54/54F:</span> Exemption available if reinvested in residential property</p>
                  </>
                )}
                {assetType === 'crypto' && (
                  <>
                    <p><span className="font-medium">Flat rate:</span> 30% on gains without any deductions or set-off of losses</p>
                    <p><span className="font-medium">TDS:</span> 1% TDS on transfer of virtual digital assets</p>
                  </>
                )}
              </div>
            </div>
            
            {(assetType === 'debt' || assetType === 'property' || assetType === 'gold') && (
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Indexation Benefit</h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <p>Indexation adjusts the purchase price for inflation, reducing the taxable gain.</p>
                  <p><span className="font-medium">Formula:</span> Indexed Cost = Original Cost × (CII of Sale Year ÷ CII of Purchase Year)</p>
                  <p><span className="font-medium">CII:</span> Cost Inflation Index published by the Income Tax Department</p>
                  <p className="text-[--success-600] font-medium">In this case, indexation saved you {formatCurrency(taxSavingsFromIndexation)} in taxes.</p>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Tax Planning Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                {assetType === 'equity' && (
                  <>
                    <li>Consider harvesting losses to offset gains</li>
                    <li>Time your sales to spread gains across financial years</li>
                    <li>Utilize the ₹1 lakh exemption for long-term gains efficiently</li>
                    <li>Consider ELSS funds for tax-saving along with capital gains</li>
                  </>
                )}
                {(assetType === 'debt' || assetType === 'gold') && (
                  <>
                    <li>Hold investments for at least 36 months to qualify for long-term gains</li>
                    <li>Utilize indexation benefit to reduce tax liability</li>
                    <li>Consider debt mutual funds for more tax-efficient returns</li>
                    <li>For gold, consider Sovereign Gold Bonds for additional interest income</li>
                  </>
                )}
                {assetType === 'property' && (
                  <>
                    <li>Hold property for at least 24 months to qualify for long-term gains</li>
                    <li>Invest in another residential property to claim exemption under Section 54/54F</li>
                    <li>Invest in specified bonds under Section 54EC within 6 months of sale</li>
                    <li>Keep all improvement cost receipts to add to the cost of acquisition</li>
                  </>
                )}
                {assetType === 'crypto' && (
                  <>
                    <li>Maintain detailed records of all transactions</li>
                    <li>Consider tax implications before each trade</li>
                    <li>Be aware that losses from crypto cannot be set off against other income</li>
                    <li>Stay updated with evolving regulations in this space</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapitalGainsTaxAdvancedCalculator;