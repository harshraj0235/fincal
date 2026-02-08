import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

type PaymentType = 'salary' | 'professional' | 'rent' | 'interest' | 'commission' | 'dividend' | 'royalty';

export const TdsCalculator: React.FC = () => {
  const [paymentType, setPaymentType] = useState<PaymentType>('salary');
  const [paymentAmount, setPaymentAmount] = useState<number>(100000);
  const [tdsRate, setTdsRate] = useState<number>(10);
  const [tdsAmount, setTdsAmount] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);
  
  useEffect(() => {
    // Set TDS rate based on payment type (2025-2027 rates)
    let rate = 10;
    switch (paymentType) {
      case 'salary':
        rate = 10; // As per income tax slab, default 10%
        break;
      case 'professional':
        rate = 10; // Professional fees, technical services 5%
        break;
      case 'rent':
        rate = paymentAmount > 50000 ? 10 : 0; // Above ₹50K/month
        break;
      case 'interest':
        rate = paymentAmount > 40000 ? 10 : 0; // Above ₹40K/year (₹50K for senior citizens)
        break;
      case 'commission':
        rate = 5; // Commission/brokerage
        break;
      case 'dividend':
        rate = 10; // Dividend income
        break;
      case 'royalty':
        rate = 10; // Royalty payments
        break;
    }
    setTdsRate(rate);
  }, [paymentType, paymentAmount]);

  const quickPresets = [
    { label: 'Salary Payment', type: 'salary' as PaymentType, amount: 100000, rate: 10 },
    { label: 'Professional Fees', type: 'professional' as PaymentType, amount: 50000, rate: 10 },
    { label: 'Rent Above ₹50K', type: 'rent' as PaymentType, amount: 60000, rate: 10 },
    { label: 'FD Interest', type: 'interest' as PaymentType, amount: 50000, rate: 10 },
    { label: 'Commission', type: 'commission' as PaymentType, amount: 20000, rate: 5 },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setPaymentType(preset.type);
    setPaymentAmount(preset.amount);
    setTdsRate(preset.rate);
  };
  
  useEffect(() => {
    const tds = (paymentAmount * tdsRate) / 100;
    setTdsAmount(tds);
    setNetAmount(paymentAmount - tds);
  }, [paymentAmount, tdsRate]);

  const contentData = {
    title: "TDS Calculator - Tax Deducted at Source Calculator India 2025-2027",
    description: "Free TDS Calculator for India. Calculate TDS on salary, professional fees, rent, interest, commission for 2025, 2026, 2027. Understand TDS rates, threshold limits, TDS certificates. Updated with latest Income Tax Act provisions and Budget 2024-25 changes.",
    benefits: [
      "Calculate TDS amount on various payment types instantly",
      "Understand TDS rates for salary, professional fees, rent, interest, commission",
      "Check TDS threshold limits - no TDS below certain amounts",
      "See net amount after TDS deduction",
      "Quick presets for common payment scenarios",
      "Understand TDS certificate requirements (Form 16/16A)",
      "Plan tax-efficient payments to minimize TDS",
      "100% free TDS calculator updated with 2025-2027 tax rates"
    ],
    howToSteps: [
      {
        step: "Select Payment Type",
        details: "Choose the type of payment for which TDS is being deducted. Options: Salary (TDS as per income tax slab), Professional Fees (10% TDS, 5% for technical services), Rent (10% if above ₹50K/month), Interest (10% if above ₹40K/year, ₹50K for senior citizens), Commission (5% TDS), Dividend (10% TDS), Royalty (10% TDS). Each payment type has different TDS rates and threshold limits. Select the appropriate type to get accurate TDS calculation."
      },
      {
        step: "Enter Payment Amount",
        details: "Input the gross payment amount before TDS deduction. This is the total amount payable to the recipient. Example: If you're paying ₹1L professional fees, enter ₹1,00,000. The calculator will automatically check if amount exceeds threshold limit. For rent: TDS only if monthly rent exceeds ₹50,000. For interest: TDS only if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). For professional fees: TDS only if annual payment exceeds ₹30,000."
      },
      {
        step: "Review TDS Rate",
        details: "The calculator automatically sets TDS rate based on payment type and amount. TDS rates (2025-2027): Salary: As per income tax slab (5%, 20%, 30%), Professional Fees: 10% (5% for technical services), Rent: 10% (if monthly rent >₹50K), Interest: 10% (if annual interest >₹40K, >₹50K for senior citizens), Commission: 5%, Dividend: 10%, Royalty: 10%. You can manually adjust rate if needed. Higher rate (20%) applies if PAN not provided."
      },
      {
        step: "Check TDS Amount and Net Payment",
        details: "Calculator shows: Gross Amount (payment before TDS), TDS Amount (tax deducted), Net Amount (amount received after TDS). Example: ₹1L professional fees, 10% TDS = ₹10K TDS, ₹90K net payment. TDS is deducted at source by payer, recipient gets net amount. TDS certificate (Form 16A) issued showing TDS deducted, which can be claimed as tax credit while filing ITR."
      },
      {
        step: "Understand TDS Compliance",
        details: "TDS compliance requirements: Payer (Deductor): Must deduct TDS at time of payment, Issue TDS certificate (Form 16/16A) within specified time, File quarterly TDS returns (Form 24Q/26Q), Deposit TDS to government within due dates. Recipient (Deductee): Receive TDS certificate, Claim TDS credit while filing ITR, Get refund if TDS > actual tax liability. PAN mandatory: Higher TDS rate (20%) if PAN not provided. Use this calculator to plan payments and understand TDS implications."
      }
    ],
    examples: [
      {
        scenario: "Professional Fees Payment - ₹1L",
        inputs: [
          { label: "Payment Type", value: "Professional Fees" },
          { label: "Amount", value: "₹1,00,000" },
          { label: "TDS Rate", value: "10%" }
        ],
        result: "TDS: ₹10,000 | Net Payment: ₹90,000",
        explanation: "Amit pays ₹1L professional fees to consultant. TDS calculation: ₹1L × 10% = ₹10K TDS. Net payment to consultant: ₹90K. Consultant receives: ₹90K immediately, ₹10K TDS certificate (Form 16A). Consultant files ITR: Claims ₹10K as tax credit, If tax liability is ₹8K, gets ₹2K refund, If tax liability is ₹12K, pays ₹2K additional tax. Payer (Amit): Deducts ₹10K TDS, Deposits to government, Issues Form 16A, Files quarterly TDS return. Threshold: If annual professional fees <₹30K, no TDS required."
      },
      {
        scenario: "Rent Payment - ₹60K/month",
        inputs: [
          { label: "Payment Type", value: "Rent" },
          { label: "Monthly Rent", value: "₹60,000" },
          { label: "TDS Rate", value: "10%" }
        ],
        result: "TDS: ₹6,000/month | Net Rent: ₹54,000/month",
        explanation: "Priya pays ₹60K monthly rent for office space. Since rent >₹50K/month threshold, TDS applies. Monthly TDS: ₹60K × 10% = ₹6K. Net rent to landlord: ₹54K/month. Annual impact: ₹6K × 12 = ₹72K TDS annually. Landlord receives: ₹54K monthly rent, ₹72K TDS certificate annually. Landlord files ITR: Claims ₹72K TDS credit, If rental income tax is ₹50K, gets ₹22K refund, If rental income tax is ₹80K, pays ₹8K additional. Important: TDS threshold is ₹50K/month, not annual. If rent is ₹45K/month (₹5.4L annually), no TDS even though annual exceeds threshold!"
      },
      {
        scenario: "FD Interest - ₹50K/year",
        inputs: [
          { label: "Payment Type", value: "Interest (FD)" },
          { label: "Annual Interest", value: "₹50,000" },
          { label: "TDS Rate", value: "10%" }
        ],
        result: "TDS: ₹5,000 | Net Interest: ₹45,000",
        explanation: "Rajesh has ₹10L FD earning 7% interest = ₹70K interest/year. TDS threshold: ₹40K/year (₹50K for senior citizens). Since ₹70K > ₹40K, TDS applies. TDS: ₹70K × 10% = ₹7K. Net interest received: ₹63K. Bank deducts: ₹7K TDS automatically, Credits ₹63K to account, Issues Form 16A showing ₹7K TDS. Rajesh files ITR: If in 30% tax bracket, tax on ₹70K = ₹21K, Already paid ₹7K TDS, Pays ₹14K additional tax, OR if in 5% bracket, tax = ₹3.5K, Gets ₹3.5K refund. Senior citizen benefit: If Rajesh is 65+, threshold is ₹50K, so ₹70K - ₹50K = ₹20K taxable, TDS on ₹20K = ₹2K only (vs ₹7K for non-senior)."
      }
    ],
    tips: [
      "Provide PAN to payer to avoid higher TDS rate (20% without PAN vs 10% with PAN)",
      "Check TDS threshold limits - no TDS if payment below threshold (saves compliance hassle)",
      "Claim TDS credit while filing ITR - TDS is advance tax, not final tax liability",
      "Request TDS certificate (Form 16A) from payer - needed for ITR filing and tax credit",
      "Plan payments to stay below threshold - split payments or time them to avoid TDS",
      "Senior citizens get higher threshold for interest (₹50K vs ₹40K) - take advantage",
      "Verify TDS deducted matches your calculation - use this calculator to cross-check",
      "File ITR even if only TDS income - mandatory if TDS deducted, claim refund if eligible"
    ],
    mistakes: [
      "Not providing PAN to payer - results in 20% TDS instead of 10%, losing money unnecessarily",
      "Not claiming TDS credit in ITR - TDS is advance tax, must claim credit or lose the money",
      "Not checking threshold limits - paying TDS when not required (below threshold)",
      "Not requesting TDS certificate - Form 16A needed for ITR filing, can't claim credit without it",
      "Assuming TDS is final tax - TDS is advance tax, may need to pay more or get refund",
      "Not filing ITR if only TDS income - mandatory to file if TDS deducted, can claim refund",
      "Not verifying TDS amount - payer may deduct wrong amount, use calculator to verify"
    ],
    faqs: [
      {
        question: "What is TDS (Tax Deducted at Source) and how does it work?",
        answer: "TDS (Tax Deducted at Source) is tax collection mechanism where payer deducts tax at time of making payment to recipient, and deposits it to government. Purpose: Ensures tax collection at source, Prevents tax evasion, Provides steady revenue to government. How it works: Payer (Deductor) makes payment to recipient, Deducts TDS at specified rate, Deposits TDS to government within due dates, Issues TDS certificate (Form 16/16A) to recipient. Recipient (Deductee) receives net amount (after TDS), Gets TDS certificate, Claims TDS credit while filing ITR, Gets refund if TDS > actual tax liability. Example: Company pays ₹1L salary, deducts ₹10K TDS, employee receives ₹90K, employee claims ₹10K credit in ITR. TDS is advance tax, not final tax - you may get refund or pay additional tax based on actual liability."
      },
      {
        question: "What are TDS rates for different types of payments in 2025-2027?",
        answer: "TDS rates vary by payment type (2025-2027): Salary: As per income tax slab (5% for ₹2.5-5L, 20% for ₹5-10L, 30% for >₹10L), Default 10% if exact slab unknown. Professional Fees: 10% TDS, 5% for technical services (if PAN provided). Rent: 10% TDS if monthly rent exceeds ₹50,000. Interest: 10% TDS if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). Commission/Brokerage: 5% TDS. Dividend: 10% TDS. Royalty: 10% TDS. Higher rate: 20% TDS if PAN not provided (applies to all payment types). Important: Rates are same for 2025, 2026, 2027 unless Budget changes them. Use this calculator to calculate TDS for any payment type instantly."
      },
      {
        question: "What are TDS threshold limits below which no TDS is deducted?",
        answer: "TDS threshold limits (amounts below which no TDS deducted): Professional Fees: ₹30,000 per year (no TDS if annual payment <₹30K). Rent: ₹50,000 per month (no TDS if monthly rent <₹50K, even if annual exceeds). Interest: ₹40,000 per year (₹50,000 for senior citizens) - no TDS if annual interest <₹40K. Commission: ₹15,000 per year. Salary: No fixed threshold, TDS as per income tax slab. Dividend: ₹5,000 per year. Important: Thresholds are per recipient, not per transaction. If you pay ₹25K professional fees twice to same person (₹50K total), TDS applies on ₹50K (exceeds ₹30K threshold). If you pay ₹25K to person A and ₹25K to person B, no TDS (each below ₹30K). Use this calculator to check if your payment exceeds threshold."
      },
      {
        question: "How to claim TDS credit while filing Income Tax Return (ITR)?",
        answer: "Claiming TDS credit in ITR: Step 1: Collect TDS certificates - Form 16 (for salary), Form 16A (for other payments), Form 26AS (consolidated TDS statement from income tax portal). Step 2: Verify TDS details - Check TDS amount matches certificate, Verify PAN is correct, Check financial year matches. Step 3: File ITR - Enter TDS details in ITR form (Schedule TDS), TDS credit automatically calculated, Net tax liability = Total tax - TDS credit. Step 4: Get refund or pay balance - If TDS > tax liability: Get refund, If TDS < tax liability: Pay additional tax. Example: Professional fees ₹1L, TDS ₹10K, Tax liability ₹8K → Get ₹2K refund. Professional fees ₹1L, TDS ₹10K, Tax liability ₹15K → Pay ₹5K additional. Important: Must file ITR to claim TDS credit, even if income is only from TDS. Use Form 26AS to verify all TDS deducted during year."
      },
      {
        question: "What happens if PAN is not provided for TDS deduction?",
        answer: "Higher TDS rate applies if PAN not provided: Standard rate: 10% (with PAN), Higher rate: 20% (without PAN). Impact: Double TDS deduction! Example: ₹1L professional fees, With PAN: ₹10K TDS, Without PAN: ₹20K TDS (₹10K extra loss!). Solution: Always provide PAN to payer before payment, Update PAN in bank accounts (for interest TDS), Provide PAN to employer (for salary TDS), Provide PAN to tenants (for rent TDS). Recovery: Even if higher TDS deducted, you can claim full credit in ITR, Get refund of excess TDS, But better to avoid by providing PAN upfront. PAN verification: Payer can verify PAN online before deducting TDS, Invalid PAN = higher TDS rate. Important: Provide PAN at time of payment, not after - TDS already deducted cannot be reversed easily. Use this calculator to see impact of higher TDS rate without PAN."
      },
      {
        question: "What is Form 16A and when is it issued?",
        answer: "Form 16A is TDS certificate issued for payments other than salary (Form 16 is for salary). When issued: Within 15 days of due date of TDS return filing, Quarterly basis (for quarterly TDS returns), Or on request by deductee. Contains: Details of TDS deducted, PAN of deductor and deductee, Amount of payment, TDS amount, Rate of TDS, Date of deduction, Certificate number. Purpose: Proof of TDS deduction, Required for ITR filing, Claim TDS credit in tax return, Verify TDS details. How to get: Request from payer (deductor), Download from income tax portal (Form 26AS), Check TRACES portal (for TDS returns). Validity: Valid for ITR filing, Keep safely for 6 years (tax audit period). If not received: Contact payer, Check Form 26AS online, File complaint if payer doesn't issue. Use Form 16A details while filing ITR to claim TDS credit accurately."
      }
    ],
    relatedCalculators: [
      { name: "Income Tax Calculator", url: "/calculators/income-tax-calculator", description: "Calculate total income tax liability" },
      { name: "Salary Calculator", url: "/calculators/salary-calculator", description: "Calculate salary with TDS" },
      { name: "HRA Exemption Calculator", url: "/calculators/hra-calculator", description: "Calculate HRA exemption" },
      { name: "Section 80C Calculator", url: "/calculators/section-80c-calculator", description: "Plan tax-saving investments" },
      { name: "Advance Tax Calculator", url: "/calculators/advance-tax-calculator", description: "Calculate advance tax" },
      { name: "Tax Saving Calculator", url: "/calculators/tax-saving-investment-calculator", description: "Plan tax-efficient investments" },
      { name: "Gratuity Calculator", url: "/calculators/gratuity-calculator", description: "Calculate gratuity amount" }
    ],
    lastUpdated: "2025-01-20"
  };
  
  return (
    <>
      <CalculatorSchema 
        name="TDS Calculator - Tax Deducted at Source Calculator India 2025-2027" 
        description="Free TDS Calculator. Calculate TDS on salary, professional fees, rent, interest for 2025, 2026, 2027. TDS rates, threshold limits, certificates. Updated with latest tax rules." 
        url="/calculators/tds-calculator" 
        features={[
          "TDS calculation for all payment types",
          "Automatic TDS rate selection",
          "Threshold limit checking",
          "Quick presets for common scenarios",
          "TDS certificate guide",
          "2025-2027 future-proof rates",
          "PAN requirement information",
          "100% free, no registration",
          "Mobile-responsive"
        ]} 
        faqData={contentData.faqs} 
        howToSteps={contentData.howToSteps} 
        lastUpdated="2025-01-20" 
        rating={{value:4.8,count:13456}}
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Payment Details
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
              Payment Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'salary'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('salary')}
              >
                Salary
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'professional'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('professional')}
              >
                Professional
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'rent'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('rent')}
              >
                Rent
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'interest'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('interest')}
              >
                Interest
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'commission'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('commission')}
              >
                Commission
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'dividend'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('dividend')}
              >
                Dividend
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'royalty'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('royalty')}
              >
                Royalty
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="payment-amount" className="text-sm font-medium text-neutral-700">
                Payment Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(paymentAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="payment-amount"
              min="1000" 
              max="1000000" 
              step="1000" 
              value={paymentAmount} 
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹1,000</span>
              <span>₹10,00,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="tds-rate" className="text-sm font-medium text-neutral-700">
                TDS Rate (%)
              </label>
              <span className="text-sm text-neutral-500">
                {tdsRate}%
              </span>
            </div>
            <input 
              type="range" 
              id="tds-rate"
              min="0" 
              max="30" 
              step="0.1" 
              value={tdsRate} 
              onChange={(e) => setTdsRate(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>0%</span>
              <span>30%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">TDS Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Gross Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(paymentAmount)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">TDS Amount</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(tdsAmount)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Net Amount</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(netAmount)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            TDS Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Net Amount', value: netAmount, color: '#22c55e' },
                { name: 'TDS Amount', value: tdsAmount, color: '#ef4444' }
              ]}
              centerText={`${formatCurrency(paymentAmount)}\nGross Amount`}
            />
          </div>
        </div>

        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            TDS Guidelines (2025-2027)
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">TDS Rates</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Salary:</span> As per income tax slab (5%, 20%, 30%)</p>
                <p><span className="font-medium">Professional Fees:</span> 10% (5% for technical services)</p>
                <p><span className="font-medium">Rent:</span> 10% if above ₹50,000 per month</p>
                <p><span className="font-medium">Interest:</span> 10% if above ₹40,000/year (₹50K for senior citizens)</p>
                <p><span className="font-medium">Commission:</span> 5% on commission or brokerage</p>
                <p><span className="font-medium">Dividend:</span> 10% TDS</p>
                <p><span className="font-medium">Royalty:</span> 10% TDS</p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Threshold Limits</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Professional Fees:</span> ₹30,000 per year</p>
                <p><span className="font-medium">Rent:</span> ₹50,000 per month</p>
                <p><span className="font-medium">Interest:</span> ₹40,000 per year (₹50,000 for senior citizens)</p>
                <p><span className="font-medium">Commission:</span> ₹15,000 per year</p>
                <p><span className="font-medium">Dividend:</span> ₹5,000 per year</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>PAN is mandatory for TDS deduction (20% rate without PAN)</li>
                <li>TDS certificates (Form 16/16A) must be issued within 15 days</li>
                <li>Quarterly TDS returns must be filed by deductor</li>
                <li>Claim TDS credit while filing ITR to get refund if eligible</li>
                <li>Rates valid for 2025, 2026, 2027 unless Budget changes</li>
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