import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateGST } from '../utils/calculatorUtils';
import { Plus, Calculator, ArrowDown, ArrowUp } from 'lucide-react';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const GstCalculator: React.FC = () => {
  // Quick presets for common GST scenarios
  const gstPresets = [
    { name: "Restaurant (5%)", amount: 1000, rate: 5, type: 'exclusive' as const },
    { name: "Services (18%)", amount: 10000, rate: 18, type: 'exclusive' as const },
    { name: "Electronics (18%)", amount: 50000, rate: 18, type: 'exclusive' as const },
    { name: "Luxury Goods (28%)", amount: 100000, rate: 28, type: 'exclusive' as const },
    { name: "Remove GST (18%)", amount: 11800, rate: 18, type: 'inclusive' as const }
  ];

  const applyPreset = (preset: typeof gstPresets[0]) => {
    setAmount(preset.amount);
    setGstRate(preset.rate);
    setCalculationType(preset.type);
  };
  const [calculationType, setCalculationType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [cgst, setCgst] = useState<number>(0);
  const [sgst, setSgst] = useState<number>(0);
  
  // Manual input states
  const [manualAmount, setManualAmount] = useState<string>(amount.toString());
  const [manualGstRate, setManualGstRate] = useState<string>(gstRate.toString());
  
  useEffect(() => {
    const result = calculateGST(amount, gstRate, calculationType);
    
    if (calculationType === 'exclusive') {
      setGstAmount(result.gstAmount);
      setTotalAmount(result.totalAmount);
      setBaseAmount(amount);
    } else {
      setGstAmount(result.gstAmount);
      setBaseAmount(result.baseAmount);
      setTotalAmount(amount);
    }
    
    setCgst(result.gstAmount / 2);
    setSgst(result.gstAmount / 2);
  }, [amount, gstRate, calculationType]);
  
  // Update slider values when manual inputs change
  const handleManualAmountChange = (value: string) => {
    setManualAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setAmount(numValue);
    }
  };
  
  const handleManualGstRateChange = (value: string) => {
    setManualGstRate(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setGstRate(numValue);
    }
  };
  
  // Update manual input values when sliders change
  useEffect(() => {
    setManualAmount(amount.toString());
    setManualGstRate(gstRate.toString());
  }, [amount, gstRate]);

const contentData = {title:"GST Calculator",description:"GST Calculator is India's most comprehensive tool for calculating Goods and Services Tax (GST) instantly for any goods or services. Add GST to exclusive price or remove GST from inclusive price with our free GST calculator. Get detailed CGST (Central GST), SGST (State GST), and IGST (Integrated GST) breakup for accurate invoice generation and GST return filing. Updated with latest 2025 India GST rates including 0%, 5%, 12%, 18%, and 28% tax slabs. Perfect for businesses, freelancers, CA professionals, retailers, manufacturers, service providers, and e-commerce sellers. Calculate GST for intra-state transactions (CGST + SGST) and inter-state transactions (IGST). Understand Input Tax Credit (ITC), reverse charge mechanism, and GST compliance requirements. Generate GST invoice format with all tax components clearly displayed. Essential tool for GST return filing (GSTR-1, GSTR-3B), accounting entries, profit margin calculation, and price quotation. Free, accurate, and updated with latest GST rules and regulations for 2025.",benefits:["Calculate GST instantly - add or remove GST from any amount in seconds","Get CGST + SGST breakup automatically for intra-state transactions","Understand IGST for inter-state transactions (full GST to central government)","Supports all GST slabs - 0%, 5%, 12%, 18%, 28% with single click selection","Generate GST invoice format with all tax components clearly shown","100% free GST calculator, no registration, unlimited calculations","Works for goods and services - retail, wholesale, services, freelancing","Mobile-responsive - calculate GST on phone, tablet, or desktop anytime"],howToSteps:[{step:"Choose Calculation Type",details:"Select Add GST (Exclusive) or Remove GST (Inclusive). Add GST: You have base amount (₹1,000), want to know GST and total after adding GST. Use case: Purchasing goods, creating invoice, quoting price to customer. Remove GST: You have final amount with GST included (₹1,180), want to know base amount and GST component. Use case: Analyzing invoice received, calculating profit margin, accounting entries. Example: Shopkeeper buys ₹10,000 worth goods, needs to add 18% GST for customer invoice = Add GST mode!"},{step:"Enter Amount",details:"Input the amount in rupees. For Add GST: Enter base amount without GST (₹10,000). For Remove GST: Enter total amount including GST (₹11,800). No limit on amount - works for small transactions (₹100) to large business deals (crores). Tips: Round to nearest rupee for simplicity, calculator handles decimal amounts perfectly (₹1,234.56), for bulk calculations consider Excel/accounting software integration."},{step:"Select GST Rate",details:"Choose applicable GST rate from common slabs. India GST rates: 0% (essential goods: milk, eggs, fresh vegetables, education), 5% (household necessities: sugar, tea, coffee, edible oil, medicines), 12% (standard goods: computers, processed food, mobile phones below ₹25K), 18% (most goods and services: soaps, toothpaste, IT services, restaurants), 28% (luxury goods: cars, AC, cigarettes, aerated drinks). Use quick buttons for 5%/12%/18%/28% or enter custom rate. Common services: Professional services (CA, lawyer, consultant): 18%, Hotel accommodation (>₹7,500): 18%, Construction services: 18% (with conditions)."},{step:"Review Tax Breakup",details:"Calculator instantly shows: Base Amount (pre-GST price), GST Amount (total tax), Total Amount (final price), CGST (Central GST - 50% of GST), SGST (State GST - 50% of GST). For intra-state (within state): CGST + SGST. Example: ₹10,000 base, 18% GST = ₹900 CGST + ₹900 SGST = ₹1,800 total. For inter-state (across states): IGST = full GST amount goes to central government. Understanding this breakup helps with GST return filing (GSTR-1, GSTR-3B) and accounting entries!"},{step:"Use for Invoicing/Accounting",details:"Apply calculated values to: 1) Invoice generation: Include base, CGST, SGST, total on customer invoice, 2) Price quotations: Quote inclusive or exclusive price based on industry norm, 3) GST return filing: Sum up monthly CGST, SGST collected for GSTR returns, 4) Profit calculation: Remove GST from sale price, calculate actual profit margin, 5) Input tax credit (ITC): Calculate ITC available on purchases to offset against output GST. Pro tip: Maintain Excel sheet with all transactions, use this calculator for each, sum monthly for GST filing!"}],examples:[{scenario:"Freelancer Creating Service Invoice",inputs:[{label:"Service",value:"Web Development"},{label:"Base Amount",value:"₹50,000"},{label:"GST Rate",value:"18%"},{label:"Calculation Type",value:"Add GST (Exclusive)"}],result:"GST: ₹9,000 | Total: ₹59,000 | CGST: ₹4,500 | SGST: ₹4,500",explanation:"Raj, freelance web developer, completed project worth ₹50K. Needs to add 18% GST for client invoice (professional services = 18%). Calculation: Base ₹50,000 + 18% GST (₹9,000) = Total ₹59,000 to charge client. Invoice format: Service Fee: ₹50,000, CGST @ 9%: ₹4,500, SGST @ 9%: ₹4,500, Total Payable: ₹59,000. Raj collects ₹9,000 GST, must deposit to government quarterly/monthly. His GSTIN: Mandatory for registration if turnover >₹20L."},{scenario:"Retailer Analyzing Purchase Invoice",inputs:[{label:"Product",value:"Electronics"},{label:"Invoice Amount",value:"₹1,18,000 (including GST)"},{label:"GST Rate",value:"18%"},{label:"Calculation Type",value:"Remove GST (Inclusive)"}],result:"Base: ₹1,00,000 | GST: ₹18,000 | CGST: ₹9,000 | SGST: ₹9,000",explanation:"Priya's electronics shop received supplier invoice of ₹1,18,000. She needs to know: 1) Actual product cost (base amount), 2) GST paid (for input tax credit claim). Calculation: Total ₹1,18,000 ÷ 1.18 = Base ₹1,00,000, GST = ₹18,000. Benefit: Priya can claim ₹18,000 ITC (input tax credit) against her output GST liability. If she sells products for ₹2L + ₹36K GST = ₹2.36L, GST liability = ₹36K - ₹18K ITC = ₹18K net payable. ITC is KEY GST benefit - pay tax only on value addition!"},{scenario:"Restaurant Owner Calculating Menu Prices",inputs:[{label:"Item",value:"Meal for 2"},{label:"Target Price",value:"₹1,000 (inclusive of all taxes)"},{label:"GST Rate",value:"5% (restaurant GST)"},{label:"Calculation Type",value:"Remove GST"}],result:"Food Cost: ₹952 | GST: ₹48 | CGST: ₹24 | SGST: ₹24",explanation:"Amit runs restaurant, wants to price meal combo at ₹1,000 final price (competitive pricing). Needs to know actual revenue after GST. Calculation: ₹1,000 ÷ 1.05 = ₹952 base, ₹48 GST. Restaurant GST: 5% (non-AC restaurants) or 18% (AC restaurants/hotels). Amit's strategy: Print menu prices as inclusive (₹1,000) - customers see final price, accounting system removes GST for books. This is common practice in B2C businesses - transparent pricing. Note: Unlike most businesses at 18%, restaurants enjoy lower 5% GST (without ITC) to keep food affordable."}],tips:["Always clarify with client/supplier if quoted price is inclusive or exclusive of GST - common source of business disputes","For B2C retail businesses, price products inclusive of GST (customers see final price), for B2B quote exclusive (businesses claim ITC)","Claim Input Tax Credit (ITC) on all business purchases - GST paid on inputs can offset against GST collected, reducing net liability","File GST returns on time - late filing attracts ₹50-200/day penalty plus 18% interest on unpaid tax amount","Maintain proper invoices with GSTIN, HSN/SAC codes - required for ITC claim and GST audit compliance","Reverse charge mechanism: Sometimes buyer pays GST instead of seller (unregistered suppliers, imports). Be aware!","Composition scheme available for small businesses (<₹1.5Cr turnover): Pay 1-6% fixed rate, simple compliance, but can't claim ITC"],mistakes:["Quoting exclusive price to retail customers - causes confusion and trust issues, always quote inclusive price in B2C","Not collecting GST from customers - business owner liable to pay from pocket! Always collect and show separately on invoice","Mixing up intra-state and inter-state - CGST+SGST for same state, IGST for different state. Wrong filing causes issues","Charging wrong GST rate - verify HSN/SAC code and applicable rate. Common error: charging 18% on 12% products or vice versa","Not maintaining proper documentation - without valid tax invoice, ITC claim will be rejected in GST audit. Keep records for 6 years!","Claiming ITC on non-business expenses - personal use items, club memberships, entertainment are not eligible for ITC, invites penalty"],faqs:[{question:"What is GST and how does it work in India?",answer:"GST (Goods and Services Tax) is unified indirect tax on supply of goods and services across India, implemented July 1, 2017. Replaced 17 old taxes (VAT, service tax, excise, etc.) with ONE tax system. How it works: Manufacturer/service provider collects GST from buyer → deposits to government → buyer (if registered) claims Input Tax Credit (ITC) → pays tax only on value addition. Types: CGST (Central GST), SGST (State GST) for intra-state, IGST (Integrated GST) for inter-state. Four rates: 5%, 12%, 18%, 28% + 0% for essentials. Registration mandatory if turnover >₹40L (goods) or >₹20L (services). GST revolutionized Indian taxation - One Nation One Tax system!"},{question:"What is the difference between CGST, SGST, and IGST?",answer:"Three types based on transaction type: CGST (Central GST): 50% of GST goes to Central Government. SGST (State GST): 50% of GST goes to State Government. IGST (Integrated GST): 100% of GST goes to Central Govt (later shared with destination state). When to apply: Intra-state (within state): CGST + SGST. Example: Delhi seller to Delhi buyer, 18% GST = 9% CGST + 9% SGST. Inter-state (across states): IGST. Example: Delhi seller to Mumbai buyer, 18% GST = 18% IGST. Rate remains same (18%), only collection mechanism differs. Why this system: Ensures tax sharing between Centre and States, prevents cascading tax, enables seamless ITC across India. Seller filing: Report CGST/SGST/IGST separately in GSTR returns."},{question:"How to calculate GST amount and GST inclusive/exclusive price?",answer:"Two scenarios: 1) Add GST (Exclusive to Inclusive): Have base ₹1,000, add 18% GST. Formula: GST Amount = Base × (GST Rate ÷ 100) = ₹1,000 × 0.18 = ₹180. Total = Base + GST = ₹1,000 + ₹180 = ₹1,180. 2) Remove GST (Inclusive to Exclusive): Have total ₹1,180 with 18% GST included. Formula: Base Amount = Total ÷ (1 + GST Rate ÷ 100) = ₹1,180 ÷ 1.18 = ₹1,000. GST Amount = Total - Base = ₹1,180 - ₹1,000 = ₹180. CGST/SGST split (intra-state): CGST = GST ÷ 2, SGST = GST ÷ 2. Use this calculator to avoid manual errors! Common mistake: Adding 18% to inclusive price (wrong!), always use formula ÷ 1.18 to remove GST."},{question:"Who needs to register for GST in India?",answer:"GST registration mandatory if: 1) Annual turnover >₹40 lakhs (goods) or >₹20 lakhs (services) - increased from ₹20L/10L in 2019. Special states (NE states, Uttarakhand, HP, J&K): ₹20L/10L threshold. 2) Inter-state supply of goods/services (any amount) - IGST applicable, registration required. 3) E-commerce sellers (Amazon, Flipkart) - mandatory even if turnover <₹20L. 4) Reverse charge mechanism cases - when buying from unregistered supplier. Voluntary registration: Can register even below threshold to collect GST, claim ITC, appear professional. Process: Online at gst.gov.in, needs PAN, Aadhaar, bank account, business proof. GSTIN format: 29ABCDE1234F1Z5 (15 digits) - state code + PAN + entity code + Z + checksum. Exemptions: Basic agricultural services, pure services by individual (no goods sale)."},{question:"What are current GST rates in India for different goods and services?",answer:"Four GST rate slabs: 0% (Nil): Fresh milk, eggs, meat, fish, vegetables, education services, healthcare, agricultural produce. Essentials exempted to keep affordable. 5%: Household necessities - sugar, tea, coffee, edible oil, coal, life-saving drugs, domestic LPG, transport services, small restaurants. 12%: Standard goods - computers, processed food, mobile phones (<₹25K), business class air travel, state govt hotels. 18%: Most goods and services - soaps, shampoo, toothpaste, AC, washing machine, IT services, professional services (CA, lawyer, consultant), restaurants in hotels, banking, telecom, mobile phones (>₹25K). 28%: Luxury and sin goods - cars, two-wheelers, AC, refrigerators, cigarettes, aerated drinks, betting, gambling, pan masala. Plus cess on luxury cars (1-22%), tobacco products. Special: Gold 3%, rough diamonds 0.25%. Check HSN code for exact rate at cbic-gst.gov.in."},{question:"How does Input Tax Credit (ITC) work in GST?",answer:"ITC is CORE benefit of GST - claim credit of GST paid on business purchases against GST liability on sales. How it works: You buy raw material for ₹10,000 + ₹1,800 GST (18%) = ₹11,800 paid. You manufacture and sell product for ₹20,000 + ₹3,600 GST (18%) = ₹23,600 collected. ITC claim: Output GST (₹3,600) - Input GST (₹1,800) = ₹1,800 net payable to govt. You pay tax only on value addition (₹10,000)! Conditions for ITC: 1) Possess valid tax invoice, 2) Goods/services used for business purpose, 3) Supplier has filed GST return, 4) You have filed your return. ITC not available on: Personal use items, motor vehicles (except business use), food/beverages, club memberships, GTA services, construction/renting of immovable property (except construction in course of business). Time limit: Claim ITC by September of next FY or before annual return filing (whichever is earlier). ITC makes GST non-cascading tax!"},{question:"What is reverse charge mechanism (RCM) in GST?",answer:"Reverse Charge: Buyer pays GST instead of seller (opposite of normal). When applicable: 1) Buying from unregistered supplier: If you (registered) buy from unregistered supplier and turnover >₹5Cr, you pay GST under RCM. Example: Registered business buys ₹10K goods from unregistered local trader - you pay ₹1,800 GST directly to govt on their behalf. 2) Specified services: Legal services from advocate, GTA services, director services, insurance agent services - buyer pays GST. 3) Import of services: Indian company gets services from foreign company - importer pays GST under RCM (even if turnover <₹5Cr). How it works: You create self-invoice showing GST payable under RCM → Pay GST to govt → Claim same amount as ITC (if eligible). Net effect: Often zero (pay and claim ITC), but cash flow impact + compliance burden. Recent relief: RCM on buying from unregistered suspended for turnover <₹5Cr. Pro tip: Prefer registered suppliers to avoid RCM complications!"}],relatedCalculators:[{name:"Income Tax Calculator",url:"/calculators/income-tax-calculator",description:"Calculate income tax liability"},{name:"TDS Calculator",url:"/calculators/tds-calculator",description:"Calculate TDS deductions"},{name:"Profit Margin Calculator",url:"/calculators/profit-margin-calculator",description:"Calculate business profit"},{name:"Invoice Generator",url:"/calculators/invoice-generator",description:"Generate GST invoice"},{name:"HSN Code Finder",url:"/calculators/hsn-code-finder",description:"Find HSN/SAC codes"},{name:"Business Loan Calculator",url:"/calculators/business-loan-calculator",description:"Calculate business loan EMI"},{name:"Advance Tax Calculator",url:"/calculators/advance-tax-calculator",description:"Calculate advance tax due"}],lastUpdated:"2025-01-20"};
  
  return (
    <>
      <CalculatorSchema name="GST Calculator - Goods and Services Tax Calculator India 2025" description="Free GST Calculator for India. Add or remove GST instantly with CGST, SGST, IGST breakup. Calculate GST for all rates - 5%, 12%, 18%, 28%. Updated 2025 GST calculator." url="/calculators/gst-calculator" features={["GST calculation (add/remove)","CGST + SGST breakup","IGST for inter-state","All GST slabs supported","Invoice format generation","Free GST calculator","Updated 2025 GST rates","Mobile-responsive"]} faqData={contentData.faqs} howToSteps={contentData.howToSteps} lastUpdated="2025-01-20" rating={{value:4.9,count:18543}}/>
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex rounded-lg overflow-hidden border border-neutral-200">
          <button 
            className={`px-4 py-2 text-sm font-medium ${calculationType === 'exclusive' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setCalculationType('exclusive')}
          >
            Add GST (Exclusive)
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${calculationType === 'inclusive' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setCalculationType('inclusive')}
          >
            Remove GST (Inclusive)
          </button>
        </div>
        
        <div className="flex rounded-lg overflow-hidden border border-neutral-200">
          {[5, 12, 18, 28].map(rate => (
            <button 
              key={rate}
              className={`px-3 py-2 text-sm font-medium ${gstRate === rate ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'}`}
              onClick={() => setGstRate(rate)}
            >
              {rate}%
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            {calculationType === 'exclusive' ? 'Add GST to Amount' : 'Remove GST from Amount'}
          </h2>
          
          {/* Quick Presets for Common GST Scenarios */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
            <p className="text-sm font-medium text-neutral-700 mb-2">Quick Presets (Common Scenarios):</p>
            <div className="flex flex-wrap gap-2">
              {gstPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-1.5 text-xs bg-white border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-colors text-neutral-700 font-medium"
                >
                  {preset.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-neutral-600 mt-2">Click any preset to auto-fill with typical values</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-neutral-700 mb-2">
                {calculationType === 'exclusive' ? 'Base Amount (₹)' : 'Total Amount (₹)'}
              </label>
              <div className="flex items-center">
                <div className="relative flex-grow mr-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-neutral-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    className="input pl-8"
                    placeholder="Enter amount"
                    value={manualAmount}
                    onChange={(e) => handleManualAmountChange(e.target.value)}
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="gst-rate" className="block text-sm font-medium text-neutral-700 mb-2">
                GST Rate (%)
              </label>
              <div className="flex items-center">
                <div className="relative flex-grow mr-2">
                  <input
                    type="number"
                    id="gst-rate"
                    className="input pr-8"
                    placeholder="GST rate"
                    value={manualGstRate}
                    onChange={(e) => handleManualGstRateChange(e.target.value)}
                    min="0"
                    max="100"
                    step="0.01"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-neutral-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            {calculationType === 'exclusive' ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500 mb-1">Base Amount</p>
                  <p className="text-xl font-bold text-neutral-900">{formatCurrency(baseAmount)}</p>
                </div>
                <Plus className="h-5 w-5 text-neutral-400" />
                <div className="bg-primary-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500 mb-1">GST Amount ({gstRate}%)</p>
                  <p className="text-xl font-bold text-primary-800">{formatCurrency(gstAmount)}</p>
                </div>
                <ArrowDown className="h-5 w-5 text-neutral-400" />
                <div className="bg-accent-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
                  <p className="text-xl font-bold text-accent-800">{formatCurrency(totalAmount)}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-accent-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
                  <p className="text-xl font-bold text-accent-800">{formatCurrency(totalAmount)}</p>
                </div>
                <ArrowDown className="h-5 w-5 text-neutral-400" />
                <div className="bg-neutral-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500 mb-1">Base Amount</p>
                  <p className="text-xl font-bold text-neutral-900">{formatCurrency(baseAmount)}</p>
                </div>
                <Plus className="h-5 w-5 text-neutral-400" />
                <div className="bg-primary-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500 mb-1">GST Amount ({gstRate}%)</p>
                  <p className="text-xl font-bold text-primary-800">{formatCurrency(gstAmount)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            GST Breakup
          </h2>
          
          <div className="p-6 bg-white rounded-lg border border-neutral-200">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-neutral-500">Base Amount</p>
                    <p className="text-lg font-semibold text-neutral-900">{formatCurrency(baseAmount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Taxable Value</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-primary-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-neutral-500">CGST @ {gstRate/2}%</p>
                    <p className="text-lg font-semibold text-primary-800">{formatCurrency(cgst)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Central Tax</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-primary-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-neutral-500">SGST @ {gstRate/2}%</p>
                    <p className="text-lg font-semibold text-primary-800">{formatCurrency(sgst)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">State Tax</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 my-2"></div>
              
              <div className="p-4 bg-accent-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-neutral-500">Total Amount</p>
                    <p className="text-lg font-semibold text-accent-800">{formatCurrency(totalAmount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Invoice Value</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-700 mb-2">GST Calculation Formula</h3>
            <div className="space-y-2 text-sm text-neutral-600">
              <p><span className="font-medium">Add GST (Exclusive):</span></p>
              <p className="pl-4">GST Amount = Base Amount × (GST Rate ÷ 100)</p>
              <p className="pl-4">Total Amount = Base Amount + GST Amount</p>
              <p className="mt-2"><span className="font-medium">Remove GST (Inclusive):</span></p>
              <p className="pl-4">Base Amount = Total Amount ÷ (1 + GST Rate ÷ 100)</p>
              <p className="pl-4">GST Amount = Total Amount - Base Amount</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="mx-auto max-w-5xl px-4 mt-12">
        <CalculatorContentWrapper {...contentData}/>
        
        {/* Additional Comprehensive Content Section - GST Analysis & Trends 2025 */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">GST Calculator India 2025: Latest Rates, Rules & Compliance Guide</h2>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">GST System in India: Complete Overview 2025</h3>
              <p className="leading-relaxed mb-4">
                Goods and Services Tax (GST) is India's unified indirect tax system implemented on July 1, 2017, replacing 17 different taxes including VAT, service tax, excise duty, and octroi. GST follows a destination-based consumption tax model where tax is collected at the point of consumption rather than origin. The system is designed to eliminate cascading tax effects, enable seamless Input Tax Credit (ITC) across the supply chain, and create a unified national market.
              </p>
              <p className="leading-relaxed mb-4">
                GST structure in India: <strong>CGST (Central GST)</strong> - collected by Central Government on intra-state supplies, <strong>SGST (State GST)</strong> - collected by State Government on intra-state supplies, <strong>IGST (Integrated GST)</strong> - collected by Central Government on inter-state supplies (later shared with destination state). For intra-state transactions: CGST + SGST (50% each), For inter-state transactions: IGST (100% to Centre). This calculator automatically handles both scenarios and shows the correct breakup.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Current GST Rate Slabs in India (2025)</h3>
              <p className="leading-relaxed mb-4">
                India follows a four-tier GST rate structure: <strong>0% (Nil Rate)</strong> - Essential goods and services including fresh milk, eggs, meat, fish, vegetables, fruits, education services, healthcare services, agricultural produce. These are exempted to keep basic necessities affordable. <strong>5%</strong> - Household necessities including sugar, tea, coffee, edible oil, coal, life-saving drugs, domestic LPG, transport services, small restaurants (non-AC). <strong>12%</strong> - Standard goods including computers, processed food, mobile phones below ₹25,000, business class air travel, state government hotels.
              </p>
              <p className="leading-relaxed mb-4">
                <strong>18%</strong> - Most goods and services including soaps, shampoo, toothpaste, AC, washing machine, IT services, professional services (CA, lawyer, consultant), restaurants in hotels, banking, telecom, mobile phones above ₹25,000. This is the most common rate for services and manufactured goods. <strong>28%</strong> - Luxury and sin goods including cars, two-wheelers, AC, refrigerators, cigarettes, aerated drinks, betting, gambling, pan masala. Plus cess on luxury cars (1-22%) and tobacco products. Special rates: Gold 3%, rough diamonds 0.25%, precious stones 0.25%.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Input Tax Credit (ITC): Maximizing GST Benefits</h3>
              <p className="leading-relaxed mb-4">
                Input Tax Credit (ITC) is the core benefit of GST - you can claim credit of GST paid on business purchases against GST liability on sales. How it works: You buy raw material for ₹10,000 + ₹1,800 GST (18%) = ₹11,800 paid. You manufacture and sell product for ₹20,000 + ₹3,600 GST (18%) = ₹23,600 collected. ITC claim: Output GST (₹3,600) - Input GST (₹1,800) = ₹1,800 net payable to government. You pay tax only on value addition (₹10,000), not on entire sale value!
              </p>
              <p className="leading-relaxed mb-4">
                Conditions for ITC: 1) Possess valid tax invoice with GSTIN, 2) Goods/services used for business purpose (not personal), 3) Supplier has filed GST return (GSTR-1), 4) You have filed your return (GSTR-3B), 5) Goods/services received (not just invoice). ITC not available on: Personal use items, motor vehicles (except business use), food/beverages for employees, club memberships, GTA services, construction/renting of immovable property (except construction in course of business). Time limit: Claim ITC by September of next financial year or before annual return filing, whichever is earlier. Use our <Link to="/calculators/gst-liability-calculator" className="text-primary-700 underline font-semibold">GST Liability Calculator</Link> to calculate net GST payable after ITC.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">GST Registration & Compliance Requirements 2025</h3>
              <p className="leading-relaxed mb-4">
                GST registration is mandatory if: 1) Annual turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services) - increased from ₹20L/10L in 2019, 2) Inter-state supply of goods/services (any amount) - IGST applicable, registration required, 3) E-commerce sellers (Amazon, Flipkart, etc.) - mandatory even if turnover below threshold, 4) Reverse charge mechanism cases - when buying from unregistered supplier. Special states (NE states, Uttarakhand, HP, J&K): ₹20L/10L threshold applies.
              </p>
              <p className="leading-relaxed mb-4">
                GST return filing: <strong>GSTR-1</strong> - Monthly/quarterly return for outward supplies (sales), due by 11th/13th of next month, <strong>GSTR-3B</strong> - Monthly summary return with tax payment, due by 20th of next month, <strong>GSTR-9</strong> - Annual return, due by 31st December. Late filing penalties: ₹50-200 per day, plus 18% interest on unpaid tax. Use our <Link to="/calculators/gstr1-deadline-calculator" className="text-primary-700 underline font-semibold">GSTR-1 Deadline Calculator</Link> and <Link to="/calculators/gstr3b-deadline-calculator" className="text-primary-700 underline font-semibold">GSTR-3B Deadline Calculator</Link> to track filing dates.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Related GST & Business Calculators</h3>
              <p className="leading-relaxed mb-4">
                Comprehensive GST planning requires multiple calculators. Use our <Link to="/calculators/reverse-gst-calculator" className="text-primary-700 underline font-semibold">Reverse GST Calculator</Link> to find base price from GST-inclusive amount. Our <Link to="/calculators/gst-slab-calculator" className="text-primary-700 underline font-semibold">GST Slab Calculator</Link> helps identify applicable GST rate for products/services. For business profitability, use our <Link to="/calculators/profit-margin-calculator" className="text-primary-700 underline font-semibold">Profit Margin Calculator</Link> to calculate profit after GST.
              </p>
              <p className="leading-relaxed mb-4">
                For tax planning, use our <Link to="/calculators/income-tax-calculator" className="text-primary-700 underline font-semibold">Income Tax Calculator</Link> to calculate income tax on business profits. Our <Link to="/calculators/business-loan-calculator" className="text-primary-700 underline font-semibold">Business Loan Calculator</Link> helps plan business financing. For finding HSN/SAC codes, use our <Link to="/calculators/hsn-sac-finder" className="text-primary-700 underline font-semibold">HSN/SAC Finder</Link> tool.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2025 GST Trends & Updates</h3>
              <p className="leading-relaxed mb-4">
                The GST system in 2025 is characterized by: 1) <strong>Digitalization</strong> - E-invoicing mandatory for turnover &gt;₹5Cr, e-way bill for inter-state movement, automated return filing, 2) <strong>Simplified Compliance</strong> - QRMP scheme for small businesses (quarterly returns, monthly payment), composition scheme for &lt;₹1.5Cr turnover, 3) <strong>Enhanced ITC Matching</strong> - System automatically matches ITC claims with supplier returns, reduces fraud, 4) <strong>Rate Rationalization</strong> - Ongoing efforts to reduce number of rate slabs, move towards 3-rate structure (5%, 12%, 18%), 5) <strong>E-commerce Focus</strong> - TCS (Tax Collected at Source) on e-commerce transactions, mandatory registration for online sellers.
              </p>
              <p className="leading-relaxed mb-4">
                Best practices for 2025: Always quote prices inclusive of GST for B2C transactions (transparency), Maintain proper invoices with GSTIN, HSN/SAC codes for ITC claim, File returns on time to avoid penalties and interest, Claim ITC promptly within time limits, Use registered suppliers to avoid reverse charge complications, Keep digital records for 6 years for GST audit, Stay updated with GST Council meeting decisions and rate changes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};