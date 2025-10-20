import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator } from 'lucide-react';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

type AssetType = 'equity' | 'debt' | 'property';
type HoldingPeriod = 'shortTerm' | 'longTerm';

export const CapitalGainsTaxCalculator: React.FC = () => {
  const [assetType, setAssetType] = useState<AssetType>('equity');
  const [purchasePrice, setPurchasePrice] = useState<number>(100000);
  const [salePrice, setSalePrice] = useState<number>(150000);
  const [holdingPeriod, setHoldingPeriod] = useState<HoldingPeriod>('shortTerm');
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [gainAmount, setGainAmount] = useState<number>(0);
  
  useEffect(() => {
    const gain = salePrice - purchasePrice;
    setGainAmount(gain);
    
    let tax = 0;
    if (gain > 0) {
      switch (assetType) {
        case 'equity':
          if (holdingPeriod === 'shortTerm') {
            tax = gain * 0.15; // 15% for short-term equity gains
          } else {
            tax = gain > 100000 ? (gain - 100000) * 0.10 : 0; // 10% above 1L for long-term
          }
          break;
          
        case 'debt':
          if (holdingPeriod === 'shortTerm') {
            tax = gain * 0.30; // 30% for short-term debt gains
          } else {
            tax = gain * 0.20; // 20% for long-term debt gains
          }
          break;
          
        case 'property':
          if (holdingPeriod === 'shortTerm') {
            tax = gain * 0.30; // 30% for short-term property gains
          } else {
            tax = gain * 0.20; // 20% for long-term property gains
          }
          break;
      }
    }
    
    setTaxAmount(tax);
  }, [assetType, purchasePrice, salePrice, holdingPeriod]);
  
  return (
    <>
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
            <div className="flex space-x-4">
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
              min="0" 
              max="10000000" 
              step="10000" 
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
              min="0" 
              max="10000000" 
              step="10000" 
              value={salePrice} 
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Holding Period
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  holdingPeriod === 'shortTerm'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setHoldingPeriod('shortTerm')}
              >
                Short Term
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  holdingPeriod === 'longTerm'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setHoldingPeriod('longTerm')}
              >
                Long Term
              </button>
            </div>
          </div>
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
              <p className="text-sm text-neutral-500 mb-1">Tax Rate</p>
              <p className="text-xl font-bold text-neutral-900">
                {(taxAmount / Math.max(gainAmount, 1) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Tax Amount</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(taxAmount)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Tax Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Equity</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Short Term (&#8804; 1 year):</span> 15% tax on gains</p>
                <p><span className="font-medium">Long Term (&gt; 1 year):</span> 10% tax on gains above ₹1 lakh</p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Debt</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Short Term (&#8804; 3 years):</span> Taxed at income tax slab rate</p>
                <p><span className="font-medium">Long Term (&gt; 3 years):</span> 20% tax with indexation benefit</p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Property</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Short Term (&#8804; 2 years):</span> Taxed at income tax slab rate</p>
                <p><span className="font-medium">Long Term (&gt; 2 years):</span> 20% tax with indexation benefit</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>STCG tax cannot be reduced through tax deductions</li>
                <li>LTCG on equity has a tax-free threshold of ₹1 lakh per year</li>
                <li>Indexation benefit available for debt and property</li>
                <li>Tax rates are subject to applicable surcharge and cess</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="mx-auto max-w-5xl px-4 mt-12"><CalculatorContentWrapper title="Capital Gains Tax Calculator" description="Calculate capital gains tax on equity, debt mutual funds, property sale in India. Understand STCG, LTCG tax rates and exemptions for FY 2024-25. Free capital gains calculator." benefits={["Calculate STCG and LTCG tax on investments","Understand equity, debt, property tax rules","See tax on mutual funds, stocks, real estate","Plan tax-efficient investment exits"]} howToSteps={[{step:"Select Asset Type",details:"Equity, debt mutual funds, or property have different tax rules"},{step:"Enter Purchase and Sale",details:"Calculate gain and holding period"},{step:"Check Tax Rate",details:"LTCG equity 10% >₹1L, STCG 15%. Debt LTCG 20% with indexation"}]} examples={[{scenario:"Equity MF sale",inputs:[{label:"Buy",value:"₹5L"},{label:"Sell",value:"₹8L"},{label:"Hold",value:"2 years"}],result:"LTCG: ₹3L | Tax: ₹20K (₹1L exempt, ₹2L @ 10%)",explanation:"Long-term equity taxed at 10% above ₹1L"}]} tips={["Hold equity >1 year for LTCG benefit","Use ₹1L exemption annually","Consider tax loss harvesting"]} mistakes={["Selling just before 1 year (STCG 15% vs LTCG 10%)","Not using ₹1L annual exemption"]} faqs={[{question:"What is LTCG and STCG on equity?",answer:"Equity held >1 year = LTCG (10% tax above ₹1L exemption). <1 year = STCG (15% tax, no exemption)."}]} relatedCalculators={[{name:"Income Tax",url:"/calculators/income-tax-calculator",description:"Total tax calculation"}]} lastUpdated="2025-01-20"/></div>
    </>
  );
};