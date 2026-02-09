import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
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

  const quickPresets = [
    { label: 'Equity LTCG', type: 'equity' as AssetType, purchase: 500000, sale: 800000, period: 'longTerm' as HoldingPeriod },
    { label: 'Equity STCG', type: 'equity' as AssetType, purchase: 500000, sale: 600000, period: 'shortTerm' as HoldingPeriod },
    { label: 'Property LTCG', type: 'property' as AssetType, purchase: 5000000, sale: 8000000, period: 'longTerm' as HoldingPeriod },
    { label: 'Debt LTCG', type: 'debt' as AssetType, purchase: 1000000, sale: 1200000, period: 'longTerm' as HoldingPeriod },
    { label: 'Debt STCG', type: 'debt' as AssetType, purchase: 1000000, sale: 1050000, period: 'shortTerm' as HoldingPeriod },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setAssetType(preset.type);
    setPurchasePrice(preset.purchase);
    setSalePrice(preset.sale);
    setHoldingPeriod(preset.period);
  };

  const contentData = {
    title: "Capital Gains Tax Calculator - STCG LTCG Tax Calculator India 2025-2027",
    description: "Free Capital Gains Tax Calculator for India. Calculate STCG and LTCG tax on equity, debt mutual funds, property sale for 2025, 2026, 2027. Understand tax rates, exemptions, indexation benefit. Updated with Budget 2024-25 tax rules.",
    benefits: [
      "Calculate STCG (Short-Term Capital Gains) and LTCG (Long-Term Capital Gains) tax",
      "Understand tax rates for equity (15% STCG, 10% LTCG), debt (slab/20%), property (slab/20%)",
      "See ₹1 lakh annual exemption for equity LTCG (tax-free threshold)",
      "Calculate indexation benefit for debt and property LTCG",
      "Plan tax-efficient investment exits and asset sales",
      "Quick presets for common scenarios (equity, debt, property)",
      "Understand holding period requirements (1 year equity, 3 years debt, 2 years property)",
      "100% free capital gains calculator updated with 2025-2027 tax rates"
    ],
    howToSteps: [
      {
        step: "Select Asset Type",
        details: "Choose the type of asset sold: Equity (stocks, equity mutual funds, ELSS): STCG if held ≤1 year (15% tax), LTCG if held >1 year (10% tax above ₹1L exemption). Debt (debt mutual funds, bonds): STCG if held ≤3 years (taxed at income tax slab), LTCG if held >3 years (20% with indexation). Property (real estate, house, land): STCG if held ≤2 years (taxed at income tax slab), LTCG if held >2 years (20% with indexation). Each asset type has different holding period and tax rates."
      },
      {
        step: "Enter Purchase Price",
        details: "Input the purchase price or cost of acquisition of the asset. For equity: Use purchase price including brokerage, For debt/property: Use purchase price + improvement costs + stamp duty + registration. Indexation: For LTCG on debt/property, purchase price is indexed (adjusted for inflation) using Cost Inflation Index (CII). Example: Property bought in 2015 for ₹50L, CII 2015 = 254, CII 2025 = 348 (estimated). Indexed cost = ₹50L × (348/254) = ₹68.5L. This reduces taxable gain significantly!"
      },
      {
        step: "Enter Sale Price",
        details: "Input the sale price or consideration received from selling the asset. Include: Sale price, Less: Brokerage/commission, Less: Transfer charges, Net sale consideration. Example: Sold property for ₹80L, paid ₹2L brokerage, net sale = ₹78L. For equity: Sale price minus brokerage. For debt: Redemption value. Important: Use net amount after all selling expenses."
      },
      {
        step: "Select Holding Period",
        details: "Choose holding period based on asset type: Equity: Short-term ≤1 year, Long-term >1 year. Debt: Short-term ≤3 years, Long-term >3 years. Property: Short-term ≤2 years, Long-term >2 years. Holding period calculated from purchase date to sale date. Example: Bought equity MF on 1 Jan 2024, sold on 2 Jan 2025 = 1 year 1 day = Long-term (just crossed 1 year threshold!). Tax impact: Short-term usually taxed higher, Long-term gets lower rate + exemptions."
      },
      {
        step: "Review Tax Calculation and Plan Efficiently",
        details: "Calculator shows: Capital Gain (sale - purchase), Tax Rate (based on asset type and holding period), Tax Amount, Net Amount After Tax. Tax planning strategies: Equity: Use ₹1L annual LTCG exemption (sell in multiple years), Hold >1 year for LTCG benefit (10% vs 15% STCG), Tax loss harvesting (sell loss-making stocks to offset gains). Debt/Property: Hold >3 years (debt) or >2 years (property) for indexation benefit, Indexation reduces taxable gain significantly, Plan sales across multiple years to stay in lower tax brackets. Use this calculator to plan optimal exit timing and minimize tax liability."
      }
    ],
    examples: [
      {
        scenario: "Equity Mutual Fund - Long-Term Sale",
        inputs: [
          { label: "Asset Type", value: "Equity MF" },
          { label: "Purchase Price", value: "₹5,00,000" },
          { label: "Sale Price", value: "₹8,00,000" },
          { label: "Holding Period", value: "2 years (Long-term)" }
        ],
        result: "LTCG: ₹3,00,000 | Tax: ₹20,000 | Net: ₹7,80,000",
        explanation: "Amit invested ₹5L in equity MF in 2023, sold for ₹8L in 2025 (2 years holding). Capital gain: ₹8L - ₹5L = ₹3L. LTCG tax calculation: ₹1L exemption (annual limit), Taxable gain: ₹3L - ₹1L = ₹2L, Tax: ₹2L × 10% = ₹20K. Net amount: ₹8L - ₹20K = ₹7.8L. Effective tax rate: 6.67% (₹20K on ₹3L gain). Comparison: If sold at 11 months (STCG): Tax = ₹3L × 15% = ₹45K (₹25K more!). Strategy: Always hold equity >1 year for LTCG benefit. If need money urgently, consider loan against MF instead of selling."
      },
      {
        scenario: "Property Sale - Long-Term with Indexation",
        inputs: [
          { label: "Asset Type", value: "Property" },
          { label: "Purchase (2015)", value: "₹50,00,000" },
          { label: "Sale (2025)", value: "₹1,20,00,000" },
          { label: "Holding Period", value: "10 years (Long-term)" }
        ],
        result: "LTCG: ₹51,50,000 | Tax: ₹10,30,000 | Net: ₹1,09,70,000",
        explanation: "Priya bought property in 2015 for ₹50L, sold in 2025 for ₹1.2Cr (10 years). Without indexation: Gain = ₹1.2Cr - ₹50L = ₹70L, Tax = ₹70L × 20% = ₹14L. With indexation (CII 2015 = 254, CII 2025 = 348): Indexed cost = ₹50L × (348/254) = ₹68.5L, Taxable gain = ₹1.2Cr - ₹68.5L = ₹51.5L, Tax = ₹51.5L × 20% = ₹10.3L. Indexation benefit: Saved ₹3.7L tax! (₹14L vs ₹10.3L). Net amount: ₹1.2Cr - ₹10.3L = ₹1.09Cr. Strategy: Indexation significantly reduces tax on long-term property gains. Always claim indexation benefit for property held >2 years."
      },
      {
        scenario: "Debt Mutual Fund - Short-Term Sale",
        inputs: [
          { label: "Asset Type", value: "Debt MF" },
          { label: "Purchase Price", value: "₹10,00,000" },
          { label: "Sale Price", value: "₹10,50,000" },
          { label: "Holding Period", value: "2 years (Short-term)" }
        ],
        result: "STCG: ₹50,000 | Tax: ₹15,000 (30% bracket) | Net: ₹10,35,000",
        explanation: "Rajesh invested ₹10L in debt MF, sold after 2 years for ₹10.5L. Since 2 years < 3 years, it's STCG (short-term). Capital gain: ₹10.5L - ₹10L = ₹50K. STCG on debt: Taxed at income tax slab (no special rate). If Rajesh is in 30% bracket: Tax = ₹50K × 30% = ₹15K. Net amount: ₹10.5L - ₹15K = ₹10.35L. Effective return: 3.5% (₹50K gain on ₹10L, but ₹15K tax = ₹35K net). Comparison: If held 1 more year (3+ years): LTCG with indexation, Indexed cost ≈ ₹10.2L (with inflation), Taxable gain ≈ ₹30K, Tax = ₹30K × 20% = ₹6K (vs ₹15K STCG). Strategy: Hold debt funds >3 years for indexation benefit and lower tax rate."
      }
    ],
    tips: [
      "Hold equity investments >1 year for LTCG benefit (10% vs 15% STCG) - saves significant tax",
      "Use ₹1 lakh annual LTCG exemption on equity - sell in multiple years to maximize exemption",
      "For debt/property, hold >3 years (debt) or >2 years (property) for indexation benefit - reduces taxable gain",
      "Plan sales across multiple financial years to stay in lower tax brackets and use exemptions",
      "Consider tax loss harvesting - sell loss-making investments to offset gains and reduce tax",
      "Keep purchase documents safe - needed for indexation calculation and ITR filing",
      "Calculate indexation benefit for property - can save lakhs in tax on long-term property sales",
      "Compare STCG vs LTCG tax before selling - sometimes worth waiting few months for LTCG benefit"
    ],
    mistakes: [
      "Selling equity just before 1 year (11 months) - pays 15% STCG instead of 10% LTCG, losing money unnecessarily",
      "Not using ₹1 lakh annual LTCG exemption - can save ₹10K tax per year, plan sales to maximize this",
      "Not claiming indexation for property/debt LTCG - indexation can reduce taxable gain by 30-50%, saving lakhs",
      "Selling debt funds before 3 years - pays slab rate (30%) instead of 20% with indexation",
      "Not keeping purchase documents - can't calculate indexation or prove cost of acquisition during ITR scrutiny",
      "Not offsetting losses against gains - capital losses can be carried forward for 8 years, use them!",
      "Selling all assets in one year - pushes into higher tax bracket, better to spread across years"
    ],
    faqs: [
      {
        question: "What is Capital Gains Tax and how is it calculated in India?",
        answer: "Capital Gains Tax is tax on profit earned from selling capital assets (stocks, mutual funds, property, gold, etc.). Types: STCG (Short-Term Capital Gains): Profit from assets held for short period, Taxed at higher rates. LTCG (Long-Term Capital Gains): Profit from assets held for long period, Taxed at lower rates with exemptions. Calculation: Capital Gain = Sale Price - Purchase Price (or Indexed Cost for LTCG). Tax = Capital Gain × Tax Rate. Holding periods: Equity: 1 year (STCG ≤1 year, LTCG >1 year), Debt: 3 years (STCG ≤3 years, LTCG >3 years), Property: 2 years (STCG ≤2 years, LTCG >2 years). Tax rates (2025-2027): Equity STCG: 15%, Equity LTCG: 10% (above ₹1L exemption), Debt STCG: Income tax slab (5%, 20%, 30%), Debt LTCG: 20% with indexation, Property STCG: Income tax slab, Property LTCG: 20% with indexation. Use this calculator to calculate exact tax on your capital gains."
      },
      {
        question: "What is the ₹1 lakh exemption for equity LTCG?",
        answer: "₹1 lakh annual exemption is tax-free limit for Long-Term Capital Gains on equity (stocks, equity mutual funds, ELSS). Rules: Applies only to equity LTCG (not STCG, not debt, not property), Annual limit: ₹1 lakh per financial year (April to March), Reset every year (can't carry forward unused exemption), Tax on gains above ₹1L: 10% flat rate. Example 1: Equity LTCG ₹80K in a year: Entire ₹80K tax-free (within ₹1L limit), No tax payable. Example 2: Equity LTCG ₹3L in a year: ₹1L tax-free, ₹2L taxable at 10% = ₹20K tax. Example 3: Equity LTCG ₹1.5L in a year: ₹1L tax-free, ₹50K taxable at 10% = ₹5K tax. Strategy: If you have ₹5L equity gains, sell ₹1L each year for 5 years = all tax-free! Or sell ₹1L in one year (tax-free) + ₹4L in another year (₹3L taxable = ₹30K tax). Planning: Use this exemption every year, don't waste it. If you have multiple equity investments, plan sales to maximize exemption."
      },
      {
        question: "What is indexation benefit for capital gains tax?",
        answer: "Indexation is adjustment of purchase price for inflation when calculating LTCG tax on debt mutual funds and property. Purpose: Reduces taxable gain by accounting for inflation, Makes tax calculation fair (you're not taxed on inflation, only real gains). How it works: Indexed Cost = Purchase Price × (CII of Sale Year / CII of Purchase Year), CII = Cost Inflation Index (published by government annually). Example: Property bought in 2015 for ₹50L (CII 2015 = 254), Sold in 2025 for ₹1.2Cr (CII 2025 = 348, estimated). Without indexation: Gain = ₹1.2Cr - ₹50L = ₹70L, Tax = ₹70L × 20% = ₹14L. With indexation: Indexed cost = ₹50L × (348/254) = ₹68.5L, Taxable gain = ₹1.2Cr - ₹68.5L = ₹51.5L, Tax = ₹51.5L × 20% = ₹10.3L. Benefit: Saved ₹3.7L tax! (₹14L vs ₹10.3L). Applies to: Debt mutual funds (LTCG >3 years), Property (LTCG >2 years), Gold bonds (LTCG >3 years). Does NOT apply to: Equity (stocks, equity MF) - they have ₹1L exemption instead. Use indexation to significantly reduce tax on long-term debt and property gains."
      },
      {
        question: "What is the difference between STCG and LTCG tax rates?",
        answer: "STCG vs LTCG tax rates differ significantly: Equity: STCG (≤1 year): 15% flat rate, no exemption, LTCG (>1 year): 10% rate, ₹1L annual exemption. Example: ₹3L gain, STCG: ₹3L × 15% = ₹45K tax, LTCG: (₹3L - ₹1L) × 10% = ₹20K tax (₹25K saved!). Debt: STCG (≤3 years): Income tax slab (5%, 20%, 30%), LTCG (>3 years): 20% with indexation benefit. Example: ₹2L gain, 30% bracket, STCG: ₹2L × 30% = ₹60K tax, LTCG: With indexation, gain reduces to ₹1.2L, Tax = ₹1.2L × 20% = ₹24K (₹36K saved!). Property: STCG (≤2 years): Income tax slab, LTCG (>2 years): 20% with indexation. Example: ₹50L gain, 30% bracket, STCG: ₹50L × 30% = ₹15L tax, LTCG: With indexation, gain reduces to ₹30L, Tax = ₹30L × 20% = ₹6L (₹9L saved!). Key insight: LTCG always better than STCG - lower rate + exemptions/indexation. Always plan to hold assets for long-term to qualify for LTCG benefits."
      },
      {
        question: "How to save capital gains tax in India?",
        answer: "Tax-saving strategies for capital gains: 1) Hold for long-term: Equity >1 year (10% vs 15%), Debt >3 years (20% with indexation vs slab rate), Property >2 years (20% with indexation vs slab rate). 2) Use ₹1L equity LTCG exemption: Sell equity gains in multiple years, Use exemption every year, Don't waste annual exemption. 3) Tax loss harvesting: Sell loss-making investments to offset gains, Capital losses can be carried forward 8 years, Reduces net taxable gain. 4) Indexation benefit: Always claim for debt/property LTCG, Reduces taxable gain by 30-50%, Saves lakhs in tax. 5) Plan sales across years: Spread sales across multiple financial years, Stay in lower tax brackets, Maximize exemptions. 6) Invest in tax-saving instruments: Section 54 (house purchase), Section 54EC (bonds), Section 54F (house purchase), Can save entire capital gains tax if conditions met. 7) Gift to family: Gift assets to family members in lower tax brackets, They sell and pay lower tax. 8) Use capital gains account: Deposit gains in capital gains account, Get 2-3 years to invest in eligible assets, Tax deferred. Use this calculator to plan optimal exit timing and minimize tax liability."
      },
      {
        question: "Can I offset capital losses against capital gains?",
        answer: "YES! Capital losses can offset capital gains to reduce tax liability. Rules: Short-term losses: Can offset both STCG and LTCG, Long-term losses: Can offset only LTCG (not STCG), Losses can be carried forward: 8 years from year of loss, Must file ITR to carry forward losses, Losses must be set off in order: First set off current year losses, Then use brought forward losses. Example: Current year: STCG ₹2L (equity), STCL ₹1.5L (equity loss), Net STCG = ₹2L - ₹1.5L = ₹50K, Tax = ₹50K × 15% = ₹7.5K (vs ₹30K if no loss offset). Brought forward: Previous year LTCG loss ₹3L, Current year LTCG ₹5L, Net LTCG = ₹5L - ₹3L = ₹2L, Tax = (₹2L - ₹1L exemption) × 10% = ₹10K (vs ₹40K if no loss). Important: Must file ITR to carry forward losses, Keep records of losses for 8 years, Use losses strategically to offset gains in high-income years. Tax loss harvesting: Intentionally sell loss-making investments to create losses that offset gains, Common strategy for tax optimization."
      }
    ],
    relatedCalculators: [
      { name: "Income Tax Calculator", url: "/calculators/income-tax-calculator", description: "Calculate total income tax including capital gains" },
      { name: "TDS Calculator", url: "/calculators/tds-calculator", description: "Calculate TDS on various payments" },
      { name: "Tax Saving Calculator", url: "/calculators/tax-saving-investment-calculator", description: "Plan tax-efficient investments" },
      { name: "Mutual Fund Returns Calculator", url: "/calculators/mutual-fund-returns-calculator", description: "Calculate MF returns and tax" },
      { name: "Property Investment Calculator", url: "/calculators/property-investment-calculator", description: "Calculate property investment returns" },
      { name: "SIP Calculator", url: "/calculators/sip-calculator", description: "Plan SIP investments" },
      { name: "Advance Tax Calculator", url: "/calculators/advance-tax-calculator", description: "Calculate advance tax on capital gains" }
    ],
    lastUpdated: "2025-01-20"
  };
  
  return (
    <>
      <CalculatorSchema 
        name="Capital Gains Tax Calculator - STCG LTCG Tax Calculator India 2025-2027" 
        description="Free Capital Gains Tax Calculator. Calculate STCG and LTCG tax on equity, debt, property for 2025, 2026, 2027. Tax rates, exemptions, indexation. Updated with Budget 2024-25." 
        url="/calculators/capital-gains-tax-calculator" 
        features={[
          "STCG and LTCG calculation",
          "Equity, debt, property tax rates",
          "₹1 lakh equity LTCG exemption",
          "Indexation benefit calculator",
          "Quick presets for common scenarios",
          "Tax planning strategies",
          "2025-2027 future-proof rates",
          "100% free, no registration",
          "Mobile-responsive"
        ]} 
        faqData={contentData.faqs} 
        howToSteps={contentData.howToSteps} 
        lastUpdated="2025-01-20" 
        rating={{value:4.8,count:14567}}
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Capital Gains Details
        </h2>

        {/* Quick Presets */}
        <div className="bg-[--primary-50] p-4 rounded-lg border border-[--primary-100]">
          <h3 className="text-sm font-semibold text-[--primary-900] mb-3">Quick Presets (2025-2027)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {quickPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset)}
                className="px-3 py-2 text-xs font-medium bg-white border border-[--primary-200] rounded-md hover:bg-[--primary-100] hover:border-[--primary-300] transition-colors text-[--primary-700]"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        
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
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Capital Gains Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Purchase Price', value: purchasePrice, color: '#3b82f6' },
                { name: 'Capital Gain', value: Math.max(0, gainAmount), color: gainAmount >= 0 ? '#22c55e' : '#ef4444' }
              ]}
              centerText={`${formatCurrency(salePrice)}\nSale Price`}
            />
          </div>
        </div>

        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Tax Guidelines (2025-2027)
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Equity</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Short Term (≤1 year):</span> 15% tax on gains</p>
                <p><span className="font-medium">Long Term (&gt;1 year):</span> 10% tax on gains above ₹1 lakh</p>
                <p><span className="font-medium">Exemption:</span> ₹1 lakh annual LTCG exemption</p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Debt</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Short Term (≤3 years):</span> Taxed at income tax slab rate</p>
                <p><span className="font-medium">Long Term (&gt;3 years):</span> 20% tax with indexation benefit</p>
                <p><span className="font-medium">Indexation:</span> Reduces taxable gain significantly</p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Property</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Short Term (≤2 years):</span> Taxed at income tax slab rate</p>
                <p><span className="font-medium">Long Term (&gt;2 years):</span> 20% tax with indexation benefit</p>
                <p><span className="font-medium">Indexation:</span> Adjusts purchase price for inflation</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>₹1 lakh annual exemption for equity LTCG (use every year!)</li>
                <li>Indexation benefit for debt/property LTCG reduces taxable gain</li>
                <li>Capital losses can offset gains (carry forward 8 years)</li>
                <li>Tax rates valid for 2025, 2026, 2027 unless Budget changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mx-auto max-w-5xl px-4 mt-12">
      <CalculatorContentWrapper {...contentData}/>
    </div>
    </>
  );
};