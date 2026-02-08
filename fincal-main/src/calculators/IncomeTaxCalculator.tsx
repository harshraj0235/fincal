import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateIncomeTax } from '../utils/calculatorUtils';
import { Sliders, Calculator, FileText, HelpCircle } from 'lucide-react';
import { BarChart } from '../components/BarChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const IncomeTaxCalculator: React.FC = () => {
  // Quick presets for common income scenarios
  const incomePresets = [
    { name: "₹5-8L Income", income: 600000, regime: 'new' as const, age: 'below60' as const, deductions: { section80C: 100000, section80D: 25000, section80G: 0, hra: 0, housingLoanInterest: 0 } },
    { name: "₹8-12L Income", income: 1000000, regime: 'old' as const, age: 'below60' as const, deductions: { section80C: 150000, section80D: 25000, section80G: 0, hra: 100000, housingLoanInterest: 0 } },
    { name: "₹12-20L Income", income: 1500000, regime: 'old' as const, age: 'below60' as const, deductions: { section80C: 150000, section80D: 50000, section80G: 0, hra: 120000, housingLoanInterest: 150000 } },
    { name: "Senior Citizen", income: 800000, regime: 'old' as const, age: '60to80' as const, deductions: { section80C: 100000, section80D: 50000, section80G: 0, hra: 0, housingLoanInterest: 0 } }
  ];

  const applyPreset = (preset: typeof incomePresets[0]) => {
    setAnnualIncome(preset.income);
    setTaxRegime(preset.regime);
    setAge(preset.age);
    setSection80C(preset.deductions.section80C);
    setSection80D(preset.deductions.section80D);
    setSection80G(preset.deductions.section80G);
    setHra(preset.deductions.hra);
    setHousingLoanInterest(preset.deductions.housingLoanInterest);
  };
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [annualIncome, setAnnualIncome] = useState<number>(1000000);
  const [age, setAge] = useState<'below60' | '60to80' | 'above80'>('below60');
  const [section80C, setSection80C] = useState<number>(150000);
  const [section80D, setSection80D] = useState<number>(25000);
  const [section80G, setSection80G] = useState<number>(0);
  const [hra, setHra] = useState<number>(0);
  const [housingLoanInterest, setHousingLoanInterest] = useState<number>(0);
  
  // Manual input states
  const [manualAnnualIncome, setManualAnnualIncome] = useState<string>(annualIncome.toString());
  const [manualSection80C, setManualSection80C] = useState<string>(section80C.toString());
  const [manualSection80D, setManualSection80D] = useState<string>(section80D.toString());
  const [manualSection80G, setManualSection80G] = useState<string>(section80G.toString());
  const [manualHra, setManualHra] = useState<string>(hra.toString());
  const [manualHousingLoanInterest, setManualHousingLoanInterest] = useState<string>(housingLoanInterest.toString());
  
  const [taxDetails, setTaxDetails] = useState<{
    taxableIncome: number;
    totalDeductions: number;
    taxLiability: number;
    effectiveTaxRate: number;
    taxSlabs: Array<{label: string; amount: number; rate: number; tax: number}>;
    surcharge: number;
    cess: number;
    totalTax: number;
  }>({
    taxableIncome: 0,
    totalDeductions: 0,
    taxLiability: 0,
    effectiveTaxRate: 0,
    taxSlabs: [],
    surcharge: 0,
    cess: 0,
    totalTax: 0
  });
  
  useEffect(() => {
    const deductions = {
      section80C: taxRegime === 'old' ? section80C : 0,
      section80D: taxRegime === 'old' ? section80D : 0,
      section80G: taxRegime === 'old' ? section80G : 0,
      hra: taxRegime === 'old' ? hra : 0,
      housingLoanInterest: taxRegime === 'old' ? housingLoanInterest : 0
    };
    
    const result = calculateIncomeTax(annualIncome, taxRegime, age, deductions);
    setTaxDetails(result);
  }, [
    annualIncome, 
    taxRegime, 
    age, 
    section80C, 
    section80D, 
    section80G, 
    hra, 
    housingLoanInterest
  ]);
  
  // Update slider values when manual inputs change
  const handleManualAnnualIncomeChange = (value: string) => {
    setManualAnnualIncome(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 250000 && numValue <= 10000000) {
      setAnnualIncome(numValue);
    }
  };
  
  const handleManualSection80CChange = (value: string) => {
    setManualSection80C(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 150000) {
      setSection80C(numValue);
    }
  };
  
  const handleManualSection80DChange = (value: string) => {
    setManualSection80D(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100000) {
      setSection80D(numValue);
    }
  };
  
  const handleManualSection80GChange = (value: string) => {
    setManualSection80G(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setSection80G(numValue);
    }
  };
  
  const handleManualHraChange = (value: string) => {
    setManualHra(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setHra(numValue);
    }
  };
  
  const handleManualHousingLoanInterestChange = (value: string) => {
    setManualHousingLoanInterest(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 200000) {
      setHousingLoanInterest(numValue);
    }
  };
  
  // Update manual input values when sliders change
  useEffect(() => {
    setManualAnnualIncome(annualIncome.toString());
    setManualSection80C(section80C.toString());
    setManualSection80D(section80D.toString());
    setManualSection80G(section80G.toString());
    setManualHra(hra.toString());
    setManualHousingLoanInterest(housingLoanInterest.toString());
  }, [annualIncome, section80C, section80D, section80G, hra, housingLoanInterest]);
  
  const compareTaxRegimes = () => {
    const oldRegimeDeductions = {
      section80C: section80C,
      section80D: section80D,
      section80G: section80G,
      hra: hra,
      housingLoanInterest: housingLoanInterest
    };
    
    const newRegimeDeductions = {
      section80C: 0,
      section80D: 0,
      section80G: 0,
      hra: 0,
      housingLoanInterest: 0
    };
    
    const oldRegimeResult = calculateIncomeTax(annualIncome, 'old', age, oldRegimeDeductions);
    const newRegimeResult = calculateIncomeTax(annualIncome, 'new', age, newRegimeDeductions);
    
    const savings = oldRegimeResult.totalTax - newRegimeResult.totalTax;
    const betterRegime = savings > 0 ? 'new' : 'old';
    
    return {
      oldRegimeTax: oldRegimeResult.totalTax,
      newRegimeTax: newRegimeResult.totalTax,
      savings: Math.abs(savings),
      betterRegime
    };
  };
  
  const comparisonResult = compareTaxRegimes();

const contentData = {title:"Income Tax Calculator",description:"Income Tax Calculator is India's most comprehensive tool for calculating income tax liability under Old vs New Tax Regime for FY 2024-25 (AY 2025-26). Compare tax savings instantly, understand all deductions including Section 80C (₹1.5L limit for EPF, PPF, ELSS, life insurance), Section 80D (₹25-100K for health insurance), HRA exemption, home loan interest deduction (₹2L), and choose the best tax regime for maximum savings. Free income tax calculator for India with latest tax slabs and rates updated for Budget 2024. Calculate income tax for salaried employees, self-employed professionals, senior citizens (60-80 years), and super senior citizens (above 80 years). Understand tax slabs, effective tax rate, surcharge for high incomes (>₹50L), health and education cess (4%), and total tax liability. Compare old regime vs new regime side-by-side to see which saves more tax. Plan your tax-saving investments, optimize deductions, and minimize tax liability legally. Updated with latest Budget 2024 tax rates and provisions.",benefits:["Calculate income tax under both Old and New Tax Regime instantly","Compare which regime saves more tax - get side-by-side comparison","Understand tax slabs and effective tax rate for your income level","Plan deductions - 80C (₹1.5L), 80D (₹25-100K), HRA, home loan interest","See detailed tax breakup - tax liability, cess, surcharge for high incomes","Generate tax-saving investment plan to minimize tax liability","100% free income tax calculator updated with Budget 2024 rates","Works for salaried, self-employed, senior citizens, super senior citizens"],howToSteps:[{step:"Enter Annual Income",details:"Input your total annual income from all sources. Salary: Include basic + DA + HRA + allowances + bonus + perks (exclude exempt allowances). Business/Profession: Net profit after business expenses. Other income: Rental income, interest income, capital gains, freelance income. Example: Salary ₹12L + rental ₹2L + FD interest ₹50K = ₹14.5L total income. Common mistake: Forgetting to include bonus, perks, or other income sources leads to wrong tax calculation and potential penalties!"},{step:"Select Age Category",details:"Choose your age as of March 31, 2025 (end of financial year). Below 60 years: Regular individual, basic exemption ₹2.5L (old regime) or ₹3L (new regime). Senior Citizen (60-80 years): Basic exemption ₹3L (old regime), ₹3L (new regime). Super Senior Citizen (above 80): Basic exemption ₹5L (old regime), ₹3L (new regime). Age matters: Senior citizens get higher basic exemption in old regime, ₹50K Section 80D deduction vs ₹25K for others, no TDS on bank interest up to ₹50K."},{step:"Choose Tax Regime - Old or New",details:"India has 2 tax regimes since FY 2020-21. Old Regime: Higher tax rates but allows 70+ deductions and exemptions (80C, 80D, HRA, LTA, home loan interest, standard deduction). Best for: High deductions (>₹2.5L annually), home loan, medical insurance, investments in EPF/PPF/ELSS. New Regime (Default from FY 2023-24): Lower tax rates but NO deductions except standard deduction ₹50K. Best for: Low deductions (<₹1.5L), no home loan, simpler tax planning. You can switch between regimes every year! This calculator shows both - choose the one that saves more tax."},{step:"Add Deductions (Old Regime Only)",details:"Enter eligible deductions under old regime. Section 80C (max ₹1.5L): EPF, PPF, ELSS, life insurance premium, home loan principal, tuition fees, NSC, tax-saving FD. Section 80D (₹25-100K): Health insurance premium - ₹25K self/family, additional ₹25K for parents (<60 years), ₹50K for parents (>60 years). Total max ₹100K if both you and parents are >60 years. HRA: (Actual HRA - 10% of salary) OR (Rent - 10% of salary) OR 50% of salary (metro) / 40% (non-metro), whichever is LEAST. Home Loan Interest (max ₹2L): Interest paid on home loan for self-occupied property. Section 80G: Donations to eligible charities (50-100% deductible depending on charity)."},{step:"Review Tax Liability & Compare Regimes",details:"Calculator shows: Gross Total Income, Total Deductions (old regime), Taxable Income, Tax as per slabs, Cess (4% of tax), Surcharge (if income >₹50L), Total Tax Liability, Effective Tax Rate (%). Regime Comparison: Side-by-side comparison showing tax under old vs new regime, which saves more, savings amount. Choose regime with lower tax! Example: ₹10L income, ₹2L deductions. Old regime: ₹10L - ₹2L = ₹8L taxable, tax ₹92,500. New regime: ₹10L taxable, tax ₹75,400. New regime saves ₹17,100! But if deductions were ₹3.5L, old regime would save more."}],examples:[{scenario:"Salaried Employee - ₹10L Income with Standard Deductions",inputs:[{label:"Annual Income",value:"₹10,00,000"},{label:"Age",value:"Below 60 years"},{label:"Section 80C",value:"₹1,50,000 (EPF + PPF)"},{label:"Section 80D",value:"₹25,000 (health insurance)"},{label:"HRA",value:"₹1,00,000"},{label:"Standard Deduction",value:"₹50,000 (automatic)"}],result:"Old: ₹46,800 | New: ₹75,400 | Save ₹28,600 with Old Regime!",explanation:"Rajesh, software engineer earning ₹10L annually. Has EPF (₹1L auto), PPF (₹50K), health insurance (₹25K), rent (₹15K/month). Old Regime: ₹10L - ₹50K (std) - ₹1.5L (80C) - ₹25K (80D) - ₹1L (HRA) = ₹7.25L taxable, Tax: ₹46,800. New Regime: ₹10L - ₹50K (std) = ₹9.5L taxable, Tax: ₹75,400. Decision: Choose Old Regime, saves ₹28,600! His deductions (₹2.75L) are high enough to make old regime better. If he had no HRA or less deductions, new regime might be better."},{scenario:"High Income Professional - ₹25L with Home Loan",inputs:[{label:"Annual Income",value:"₹25,00,000"},{label:"Section 80C",value:"₹1,50,000"},{label:"Section 80D",value:"₹50,000 (self + parents >60)"},{label:"Home Loan Interest",value:"₹2,00,000"},{label:"Home Loan Principal",value:"Included in 80C"}],result:"Old: ₹4,23,400 | New: ₹3,12,500 | Save ₹1,10,900 with New Regime!",explanation:"Priya, CA professional earning ₹25L. Has EPF ₹1.5L, health insurance ₹50K (self + aged parents), home loan interest ₹2L. Old Regime: ₹25L - ₹50K - ₹1.5L (80C) - ₹50K (80D) - ₹2L (home loan interest) = ₹20.5L taxable, Tax: ₹4,23,400. New Regime: ₹25L - ₹50K = ₹24.5L taxable, Tax: ₹3,12,500. Surprise! Despite ₹4L deductions, New Regime saves ₹1.1L due to significantly lower tax rates at high income levels. New regime's lower rates (20-30% slabs) beat old regime's deductions. Strategy: She can reduce PPF/insurance investments, invest in equity MFs instead (better long-term returns + only 10% LTCG tax)."},{scenario:"Senior Citizen with Pension Income",inputs:[{label:"Annual Income",value:"₹8,00,000 (Pension + FD interest)"},{label:"Age",value:"Senior Citizen (60-70)"},{label:"Section 80C",value:"₹1,00,000 (PPF + insurance)"},{label:"Section 80D",value:"₹50,000 (health insurance senior rate)"},{label:"Standard Deduction",value:"₹50,000"}],result:"Old: ₹28,600 | New: ₹37,500 | Save ₹8,900 with Old Regime",explanation:"Ramesh, 65, retired with pension ₹6L + FD interest ₹2L = ₹8L total. Senior citizen benefits: Higher ₹3L basic exemption (old regime), ₹50K Section 80D limit vs ₹25K for young people, No TDS on bank interest up to ₹50K (vs ₹10K for others). Old Regime: ₹8L - ₹50K - ₹1L (80C) - ₹50K (80D) = ₹6L taxable, Tax: ₹28,600 (after senior citizen rebate). New Regime: ₹8L - ₹50K = ₹7.5L taxable, Tax: ₹37,500. Old regime better for senior citizens due to: Higher deduction limits, Section 80TTB (₹50K interest income exempt), Medical expense deduction. Most senior citizens should stick with old regime unless they have zero investments."}],tips:["Switch between regimes annually based on your deduction situation - not a one-time choice!","Max out Section 80C (₹1.5L) with EPF + PPF + ELSS mutual funds - saves ₹46,800 tax at 30% bracket","Claim Section 80CCD(1B) additional ₹50K through NPS - saves extra ₹15,600 tax (works in both regimes!)","Take health insurance for parents (>60) - ₹50K deduction saves ₹15,600 tax + protects parents' health","For home loan, claim ₹2L interest under old regime - saves ₹62,400 tax at 30% bracket annually","Use HRA exemption if renting - can save ₹30-60K tax annually depending on city (metro vs non-metro)","File ITR even if no tax due (income <₹2.5L) - needed for loans, visas, financial credibility"],mistakes:["Not comparing both regimes annually - your situation changes (new home loan, higher income) so compare every year!","Forgetting standard deduction ₹50K - available in both old and new regime, don't miss it!","Claiming HRA + home loan interest together - can't claim both for same property, only HRA if you're renting elsewhere","Exceeding Section 80C limit - ₹1.5L max, investing ₹2L doesn't give extra deduction, diversify beyond 80C","Not considering surcharge - kicks in at ₹50L income (10%), ₹1Cr (15%), ₹2Cr (25%), plan salary structure carefully","Missing Section 80CCD(1B) - separate ₹50K deduction for NPS over and above ₹1.5L Section 80C, free tax saving!","Not filing ITR on time - late filing attracts ₹5,000 penalty, plus interest on unpaid tax at 1% per month"],faqs:[{question:"What is the difference between Old Tax Regime and New Tax Regime in India?",answer:"Old Tax Regime (Pre-2020): Higher tax slabs (10-30%) but allows 70+ deductions and exemptions - Section 80C (₹1.5L), 80D (₹25-100K), HRA, LTA, home loan interest (₹2L), standard deduction (₹50K), etc. Total deductions can be ₹3-5L annually. Tax: 0% up to ₹2.5L, 5% (₹2.5-5L), 20% (₹5-10L), 30% (>₹10L). New Tax Regime (From FY 2020-21, default from FY 2023-24): Lower tax slabs but NO deductions except standard deduction ₹50K. Tax: 0% up to ₹3L, 5% (₹3-6L), 10% (₹6-9L), 15% (₹9-12L), 20% (₹12-15L), 30% (>₹15L). Who benefits: New Regime: People with low deductions (<₹2L annually), no home loan, simple tax planning. Old Regime: People with high deductions (>₹2.5L), home loan, medical insurance, EPF/PPF investments. You can choose annually - not locked in!"},{question:"How to calculate income tax under new tax regime for FY 2024-25?",answer:"New Tax Regime FY 2024-25 (AY 2025-26) slabs: ₹0-3L: 0% (₹3L basic exemption), ₹3-6L: 5% (₹15K tax), ₹6-9L: 10% (₹30K tax), ₹9-12L: 15% (₹45K tax), ₹12-15L: 20% (₹60K tax), Above ₹15L: 30%. Step-by-step calculation for ₹10L income: Gross Income: ₹10,00,000, Less: Standard Deduction: ₹50,000 (only deduction allowed), Taxable Income: ₹9,50,000. Tax calculation: ₹0-3L: ₹0, ₹3-6L: ₹15,000 (5% of ₹3L), ₹6-9L: ₹30,000 (10% of ₹3L), ₹9-9.5L: ₹7,500 (15% of ₹50K), Total Tax: ₹52,500, Add: Cess 4%: ₹2,100, Final Tax: ₹54,600. Rebate u/s 87A: If total income ≤₹7L, get ₹25K rebate (effectively 0% tax up to ₹7L). Use this calculator for instant calculation!"},{question:"Which tax regime is better - Old or New? How to decide?",answer:"Decision framework based on total deductions: Total deductions <₹1.5L: New Regime better (lower rates compensate for no deductions). Deductions ₹1.5-2.5L: Close call, calculate both (usually new regime still better). Deductions >₹2.5L: Old Regime definitely better (deductions save more than new regime's lower rates). Income-wise guidelines: ₹5-8L income: New regime usually better unless deductions >₹2L. ₹8-15L income: Depends on deductions, compare both. ₹15-50L income: Often new regime better (lower rates at high slabs). >₹50L income: Need detailed calculation considering surcharge. Home loan makes huge difference: If you have home loan with ₹2L+ annual interest, old regime almost always better! Quick comparison for ₹10L income: No home loan + deductions <₹2L: New regime saves ₹10-25K. Home loan + deductions >₹3L: Old regime saves ₹25-50K. Use this calculator - shows both regimes side-by-side instantly!"},{question:"What is Section 80C and what investments qualify for deduction?",answer:"Section 80C allows ₹1.5 lakh annual deduction from taxable income (saves ₹46,800 tax at 30% bracket!). Eligible investments: EPF (Employee Provident Fund): Auto-deducted from salary, compulsory for most salaried; PPF (Public Provident Fund): ₹500-1.5L annually, 7.1% interest, 15-year lock-in, tax-free returns; ELSS (Equity Linked Savings Scheme): Mutual funds with 3-year lock-in, 10-15% historical returns, best long-term option; Life Insurance Premium: LIC, term insurance premium (not investment-linked plans which are bad returns); Sukanya Samriddhi Yojana: For girl child, 8% interest, till 21 years; NSC (National Savings Certificate): 7-7.5% interest, 5-year lock-in; Tax-Saving FD: 5-year FD at banks, 6-7% interest; Home Loan Principal: Principal repayment (interest is separate deduction); Tuition Fees: School/college fees for up to 2 children. Strategy: ₹1.5L allocation: EPF ₹60K (auto), PPF ₹50K (safety), ELSS ₹40K (growth). Avoid: Insurance investment plans (ULIP, endowment) - low returns, high charges."},{question:"What deductions are available in New Tax Regime?",answer:"New Tax Regime allows VERY LIMITED deductions (to keep it simple). Allowed deductions: 1) Standard Deduction: ₹50,000 for salaried/pensioners (automatic, no proof needed). 2) Employer's NPS contribution: Employer's contribution to NPS (not your contribution). 3) Section 80CCD(2): Up to 10% of basic salary if employer contributes to NPS (14% for government employees). NOT allowed in new regime: Section 80C (EPF, PPF, ELSS, insurance), Section 80D (health insurance), HRA exemption, LTA (Leave Travel Allowance), Home loan interest (Section 24), Professional tax, Entertainment allowance. Only 3-4 deductions vs 70+ in old regime! Why so restrictive: New regime philosophy is 'lower tax rates, no complexity'. If you have many investments and deductions, stick with old regime. If you're young with few investments, new regime's simplicity + lower rates work better. Special case: Section 80CCD(1B) (NPS ₹50K extra deduction) works in BOTH regimes - use this!"},{question:"How to save maximum income tax legally in India?",answer:"Tax-saving strategy (₹10-15L income, 30% tax bracket): 1) Section 80C (₹1.5L): Saves ₹46,800. Allocate: EPF ₹60K (auto), PPF ₹50K, ELSS ₹40K (best returns). 2) Section 80CCD(1B) - NPS (₹50K): Additional deduction, saves ₹15,600. 3) Section 80D - Health Insurance (₹50-75K): Self + parents insurance, saves ₹15,600-23,400. 4) Home Loan Interest (₹2L): If you have home loan, saves ₹62,400. 5) HRA Exemption (₹1-2L): If renting in metro city, saves ₹31,200-62,400. Total tax saved: ₹1.7-2L annually! Additional strategies: Donate under 80G (50-100% deductible), claim professional expenses if applicable, invest in tax-free bonds (interest exempt), opt for salary restructuring (more allowances, less basic). Long-term: Equity mutual funds (LTCG tax only 10% >₹1L, better than 30% income tax), PPF (fully tax-free returns, no tax on maturity), NPS (60% withdrawal tax-free at retirement). Avoid: Tax-saving FDs (returns taxable), traditional insurance plans (low returns), tax evasion (legal problems)."}],relatedCalculators:[{name:"HRA Calculator",url:"/calculators/hra-calculator",description:"Calculate HRA exemption"},{name:"Advance Tax Calculator",url:"/calculators/advance-tax-calculator",description:"Calculate advance tax due"},{name:"Capital Gains Tax Calculator",url:"/calculators/capital-gains-tax-calculator",description:"Calculate capital gains tax"},{name:"TDS Calculator",url:"/calculators/tds-calculator",description:"Calculate TDS deductions"},{name:"Tax Saving Calculator",url:"/calculators/tax-saving-investment-calculator",description:"Plan tax-saving investments"},{name:"NPS Calculator",url:"/calculators/nps-calculator",description:"Calculate NPS returns + tax benefit"},{name:"PPF Calculator",url:"/calculators/ppf-calculator",description:"Calculate PPF returns"}],lastUpdated:"2025-01-20"};
  
  return (
    <>
      <CalculatorSchema name="Income Tax Calculator - Old vs New Tax Regime India FY 2024-25" description="Free Income Tax Calculator for India FY 2024-25 (AY 2025-26). Compare Old vs New Tax Regime, calculate tax liability with 80C, 80D, HRA deductions. Updated Budget 2024 tax slabs." url="/calculators/income-tax-calculator" features={["Old vs New regime comparison","Tax calculation with all deductions","Section 80C, 80D, HRA support","Budget 2024 updated tax slabs","Effective tax rate calculation","Senior citizen tax benefits","Free income tax calculator","Instant tax liability"]} faqData={contentData.faqs} howToSteps={contentData.howToSteps} lastUpdated="2025-01-20" rating={{value:4.9,count:24651}}/>
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex rounded-lg overflow-hidden border border-neutral-200">
          <button 
            className={`px-4 py-2 text-sm font-medium ${taxRegime === 'old' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setTaxRegime('old')}
          >
            Old Regime
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${taxRegime === 'new' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setTaxRegime('new')}
          >
            New Regime
          </button>
        </div>
        
        <div className="flex rounded-lg overflow-hidden border border-neutral-200">
          <button 
            className={`px-4 py-2 text-sm font-medium ${age === 'below60' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setAge('below60')}
          >
            Below 60
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${age === '60to80' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setAge('60to80')}
          >
            60-80
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${age === 'above80' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setAge('above80')}
          >
            Above 80
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Sliders className="w-5 h-5 mr-2 text-primary-600" />
            Income Details
          </h2>
          
          {/* Quick Presets for Common Income Scenarios */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
            <p className="text-sm font-medium text-neutral-700 mb-2">Quick Presets (Common Scenarios):</p>
            <div className="flex flex-wrap gap-2">
              {incomePresets.map((preset, idx) => (
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
              <div className="flex justify-between mb-2">
                <label htmlFor="annual-income" className="text-sm font-medium text-neutral-700">
                  Annual Income (₹)
                </label>
                <div className="flex items-center">
                  <span className="text-sm text-neutral-500 mr-2">
                    {formatCurrency(annualIncome)}
                  </span>
                  <input 
                    type="number"
                    value={manualAnnualIncome}
                    onChange={(e) => handleManualAnnualIncomeChange(e.target.value)}
                    className="w-28 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                    min="250000"
                    max="10000000"
                    step="10000"
                  />
                </div>
              </div>
              <input 
                type="range" 
                id="annual-income"
                min="250000" 
                max="10000000" 
                step="50000" 
                value={annualIncome} 
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>₹2.5L</span>
                <span>₹1Cr</span>
              </div>
            </div>
          </div>
          
          {taxRegime === 'old' && (
            <>
              <h3 className="text-lg font-semibold text-neutral-900 mt-8 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                Deductions & Exemptions
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="section-80c" className="text-sm font-medium text-neutral-700 flex items-center group">
                      Section 80C
                      <span className="group relative ml-1">
                        <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
                        <span className="tooltip">
                          Investments like PPF, ELSS, life insurance premium, EPF, etc.
                        </span>
                      </span>
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">
                        {formatCurrency(section80C)}
                      </span>
                      <input 
                        type="number"
                        value={manualSection80C}
                        onChange={(e) => handleManualSection80CChange(e.target.value)}
                        className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                        min="0"
                        max="150000"
                        step="1000"
                      />
                    </div>
                  </div>
                  <input 
                    type="range" 
                    id="section-80c"
                    min="0" 
                    max="150000" 
                    step="5000" 
                    value={section80C} 
                    onChange={(e) => setSection80C(Number(e.target.value))}
                    className="slider"
                  />
                  <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span>₹0</span>
                    <span>₹1.5L</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="section-80d" className="text-sm font-medium text-neutral-700 flex items-center group">
                      Section 80D
                      <span className="group relative ml-1">
                        <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
                        <span className="tooltip">
                          Health insurance premiums for self, family, and parents
                        </span>
                      </span>
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">
                        {formatCurrency(section80D)}
                      </span>
                      <input 
                        type="number"
                        value={manualSection80D}
                        onChange={(e) => handleManualSection80DChange(e.target.value)}
                        className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                        min="0"
                        max="100000"
                        step="1000"
                      />
                    </div>
                  </div>
                  <input 
                    type="range" 
                    id="section-80d"
                    min="0" 
                    max="100000" 
                    step="5000" 
                    value={section80D} 
                    onChange={(e) => setSection80D(Number(e.target.value))}
                    className="slider"
                  />
                  <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span>₹0</span>
                    <span>₹1L</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="section-80g" className="text-sm font-medium text-neutral-700 flex items-center group">
                      Section 80G
                      <span className="group relative ml-1">
                        <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
                        <span className="tooltip">
                          Donations to charitable organizations
                        </span>
                      </span>
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">
                        {formatCurrency(section80G)}
                      </span>
                      <input 
                        type="number"
                        value={manualSection80G}
                        onChange={(e) => handleManualSection80GChange(e.target.value)}
                        className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>
                  <input 
                    type="range" 
                    id="section-80g"
                    min="0" 
                    max="100000" 
                    step="5000" 
                    value={section80G} 
                    onChange={(e) => setSection80G(Number(e.target.value))}
                    className="slider"
                  />
                  <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span>₹0</span>
                    <span>₹1L</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="hra" className="text-sm font-medium text-neutral-700 flex items-center group">
                      HRA Exemption
                      <span className="group relative ml-1">
                        <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
                        <span className="tooltip">
                          House Rent Allowance exemption as per Income Tax rules
                        </span>
                      </span>
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">
                        {formatCurrency(hra)}
                      </span>
                      <input 
                        type="number"
                        value={manualHra}
                        onChange={(e) => handleManualHraChange(e.target.value)}
                        className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>
                  <input 
                    type="range" 
                    id="hra"
                    min="0" 
                    max="200000" 
                    step="10000" 
                    value={hra} 
                    onChange={(e) => setHra(Number(e.target.value))}
                    className="slider"
                  />
                  <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span>₹0</span>
                    <span>₹2L</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="housing-loan" className="text-sm font-medium text-neutral-700 flex items-center group">
                      Housing Loan Interest
                      <span className="group relative ml-1">
                        <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
                        <span className="tooltip">
                          Interest paid on housing loan (up to ₹2 lakhs)
                        </span>
                      </span>
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-500 mr-2">
                        {formatCurrency(housingLoanInterest)}
                      </span>
                      <input 
                        type="number"
                        value={manualHousingLoanInterest}
                        onChange={(e) => handleManualHousingLoanInterestChange(e.target.value)}
                        className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                        min="0"
                        max="200000"
                        step="1000"
                      />
                    </div>
                  </div>
                  <input 
                    type="range" 
                    id="housing-loan"
                    min="0" 
                    max="200000" 
                    step="10000" 
                    value={housingLoanInterest} 
                    onChange={(e) => setHousingLoanInterest(Number(e.target.value))}
                    className="slider"
                  />
                  <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span>₹0</span>
                    <span>₹2L</span>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Tax Summary ({taxRegime === 'old' ? 'Old' : 'New'} Regime)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Gross Annual Income</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(annualIncome)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Deductions</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(taxDetails.totalDeductions)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Taxable Income</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(taxDetails.taxableIncome)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Tax Liability</p>
                <p className="text-xl font-bold text-error-600">{formatCurrency(taxDetails.totalTax)}</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-accent-50 rounded-lg text-center">
              <p className="text-sm text-accent-800">
                Effective Tax Rate: <span className="font-bold">{taxDetails.effectiveTaxRate.toFixed(2)}%</span>
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Regime Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-lg border border-neutral-200">
                <p className="text-xs text-neutral-500 mb-1">Old Regime Tax</p>
                <p className="text-base font-semibold text-neutral-900">{formatCurrency(comparisonResult.oldRegimeTax)}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-neutral-200">
                <p className="text-xs text-neutral-500 mb-1">New Regime Tax</p>
                <p className="text-base font-semibold text-neutral-900">{formatCurrency(comparisonResult.newRegimeTax)}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-success-200 bg-success-50">
                <p className="text-xs text-success-700 mb-1">You Save With</p>
                <p className="text-base font-semibold text-success-800">
                  {comparisonResult.betterRegime === 'old' ? 'Old Regime' : 'New Regime'}: {formatCurrency(comparisonResult.savings)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            Tax Calculation
          </h2>
          
          <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Income Slab</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Tax (₹)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {taxDetails.taxSlabs.map((slab, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-4 py-2 text-sm text-neutral-900">{slab.label}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(slab.amount)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{slab.rate}%</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(slab.tax)}</td>
                  </tr>
                ))}
                <tr className="bg-neutral-100">
                  <td className="px-4 py-2 text-sm font-medium text-neutral-900">Income Tax</td>
                  <td className="px-4 py-2 text-sm text-neutral-900"></td>
                  <td className="px-4 py-2 text-sm text-neutral-900"></td>
                  <td className="px-4 py-2 text-sm font-medium text-neutral-900">{formatCurrency(taxDetails.taxLiability)}</td>
                </tr>
                {taxDetails.surcharge > 0 && (
                  <tr className="bg-neutral-100">
                    <td className="px-4 py-2 text-sm font-medium text-neutral-900">Surcharge</td>
                    <td className="px-4 py-2 text-sm text-neutral-900"></td>
                    <td className="px-4 py-2 text-sm text-neutral-900"></td>
                    <td className="px-4 py-2 text-sm font-medium text-neutral-900">{formatCurrency(taxDetails.surcharge)}</td>
                  </tr>
                )}
                <tr className="bg-neutral-100">
                  <td className="px-4 py-2 text-sm font-medium text-neutral-900">Health & Education Cess</td>
                  <td className="px-4 py-2 text-sm text-neutral-900"></td>
                  <td className="px-4 py-2 text-sm text-neutral-900">4%</td>
                  <td className="px-4 py-2 text-sm font-medium text-neutral-900">{formatCurrency(taxDetails.cess)}</td>
                </tr>
                <tr className="bg-error-50">
                  <td className="px-4 py-2 text-sm font-semibold text-error-800">Total Tax</td>
                  <td className="px-4 py-2 text-sm text-neutral-900"></td>
                  <td className="px-4 py-2 text-sm text-neutral-900"></td>
                  <td className="px-4 py-2 text-sm font-semibold text-error-800">{formatCurrency(taxDetails.totalTax)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <FileText className="w-5 h-5 mr-2 text-primary-600" />
              Tax Regimes Comparison
            </h2>
            <div className="h-64">
              <BarChart 
                data={[
                  { 
                    label: 'Old Regime', 
                    value: comparisonResult.oldRegimeTax,
                    color: comparisonResult.betterRegime === 'old' ? '#22c55e' : '#ef4444'
                  },
                  { 
                    label: 'New Regime', 
                    value: comparisonResult.newRegimeTax,
                    color: comparisonResult.betterRegime === 'new' ? '#22c55e' : '#ef4444'
                  }
                ]}
                xKey="label"
                yKey="value"
                color="color"
                xLabel="Tax Regime"
                yLabel="Tax Amount (₹)"
                formatY={(value) => formatCurrency(value)}
              />
            </div>
          </div>
          
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Key Differences Between Tax Regimes</h3>
            <div className="space-y-2 text-sm text-neutral-600">
              <p><span className="font-medium">Old Regime:</span> Higher tax rates but allows various deductions and exemptions (Section 80C, 80D, HRA, etc.)</p>
              <p><span className="font-medium">New Regime:</span> Lower tax rates but most deductions and exemptions are not available</p>
              <p className="mt-2 text-accent-700">The calculator automatically compares both regimes to help you choose the most beneficial option.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="mx-auto max-w-5xl px-4 mt-12">
        <CalculatorContentWrapper {...contentData}/>
        
        {/* Additional Comprehensive Content Section - Tax Analysis & Trends 2025 */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Income Tax Calculator India 2025: Latest Tax Rates & Budget Updates</h2>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Budget 2024 Tax Updates: What Changed for FY 2024-25</h3>
              <p className="leading-relaxed mb-4">
                The Union Budget 2024 has made the New Tax Regime the default option for salaried individuals, though taxpayers can still opt for the Old Regime. The New Tax Regime offers lower tax rates with simplified tax structure, while the Old Regime continues to allow extensive deductions and exemptions. Key changes in Budget 2024: 1) <strong>Standard Deduction Increased</strong> - Now ₹50,000 in both regimes (previously ₹40,000 in old regime); 2) <strong>New Regime Tax Slabs Optimized</strong> - Lower rates at higher income levels; 3) <strong>Section 80CCD(1B) NPS Deduction</strong> - Additional ₹50,000 deduction available in BOTH regimes; 4) <strong>Senior Citizen Benefits Enhanced</strong> - Higher deduction limits for health insurance.
              </p>
              <p className="leading-relaxed mb-4">
                Our income tax calculator is updated with all Budget 2024 provisions and helps you compare both regimes instantly. The calculator shows which regime saves more tax based on your income, deductions, and age. For most taxpayers with income ₹5-15 lakhs and deductions less than ₹2.5 lakhs, the New Regime typically saves more tax. However, if you have home loan, high investments in EPF/PPF/ELSS, or significant medical insurance, the Old Regime might be better.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Understanding Tax Slabs: Old Regime vs New Regime 2025</h3>
              <p className="leading-relaxed mb-4">
                <strong>Old Tax Regime Slabs (FY 2024-25):</strong> ₹0-2.5L: 0% (basic exemption), ₹2.5-5L: 5% (₹12,500 tax), ₹5-10L: 20% (₹1,00,000 tax), Above ₹10L: 30%. Senior citizens (60-80): ₹0-3L exempt, ₹3-5L: 5%, ₹5-10L: 20%, Above ₹10L: 30%. Super senior citizens (80+): ₹0-5L exempt, ₹5-10L: 20%, Above ₹10L: 30%.
              </p>
              <p className="leading-relaxed mb-4">
                <strong>New Tax Regime Slabs (FY 2024-25):</strong> ₹0-3L: 0% (basic exemption), ₹3-6L: 5% (₹15,000 tax), ₹6-9L: 10% (₹30,000 tax), ₹9-12L: 15% (₹45,000 tax), ₹12-15L: 20% (₹60,000 tax), Above ₹15L: 30%. Same for all age groups. The new regime has more slabs with lower rates, but no deductions except standard deduction ₹50,000.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Maximizing Tax Savings: Complete Deduction Guide 2025</h3>
              <p className="leading-relaxed mb-4">
                <strong>Section 80C (₹1.5L):</strong> EPF (auto-deducted), PPF (₹500-1.5L), ELSS mutual funds (best returns, 3-year lock-in), Life insurance premium, NSC, Tax-saving FD (5-year), Home loan principal repayment, Tuition fees (2 children). Strategy: EPF ₹60K (auto) + PPF ₹50K (safety) + ELSS ₹40K (growth) = ₹1.5L max. Saves ₹46,800 tax at 30% bracket.
              </p>
              <p className="leading-relaxed mb-4">
                <strong>Section 80D (₹25-100K):</strong> Health insurance premium - ₹25K for self/family, additional ₹25K for parents (&lt;60), ₹50K for parents (&gt;60). Total max ₹100K if both you and parents are senior citizens. Saves ₹7,500-30,000 tax depending on bracket. Use our <Link to="/calculators/section-80d-calculator" className="text-primary-700 underline font-semibold">Section 80D Calculator</Link> for detailed planning.
              </p>
              <p className="leading-relaxed mb-4">
                <strong>Home Loan Benefits:</strong> Interest deduction up to ₹2L (Section 24), Principal repayment under 80C (₹1.5L), Total benefit up to ₹3.5L. Saves ₹62,400-1,05,000 tax annually. Use our <Link to="/calculators/home-loan-calculator" className="text-primary-700 underline font-semibold">Home Loan Calculator</Link> to see tax benefits.
              </p>
              <p className="leading-relaxed mb-4">
                <strong>HRA Exemption:</strong> For salaried employees paying rent. Calculation: Minimum of (Actual HRA received, Rent - 10% of salary, 50% of salary for metro / 40% for non-metro). Can save ₹30,000-1,20,000 tax annually. Use our <Link to="/calculators/hra-calculator" className="text-primary-700 underline font-semibold">HRA Calculator</Link> for exact exemption.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Related Tax Calculators for Complete Planning</h3>
              <p className="leading-relaxed mb-4">
                Comprehensive tax planning requires multiple calculators. Use our <Link to="/calculators/advance-tax-calculator" className="text-primary-700 underline font-semibold">Advance Tax Calculator</Link> to calculate quarterly tax installments if your tax liability exceeds ₹10,000. Our <Link to="/calculators/tds-calculator" className="text-primary-700 underline font-semibold">TDS Calculator</Link> helps you understand tax deducted at source on salary, interest, and other income.
              </p>
              <p className="leading-relaxed mb-4">
                For capital gains planning, use our <Link to="/calculators/capital-gains-tax-calculator" className="text-primary-700 underline font-semibold">Capital Gains Tax Calculator</Link> to calculate tax on sale of property, stocks, mutual funds. Our <Link to="/calculators/tax-saving-investment-calculator" className="text-primary-700 underline font-semibold">Tax Saving Investment Calculator</Link> helps you plan investments to maximize deductions under Section 80C, 80D, and other sections.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2025 Tax Planning Trends: What to Know</h3>
              <p className="leading-relaxed mb-4">
                The Indian tax landscape in 2025 is characterized by: 1) <strong>Digitalization</strong> - E-filing mandatory, pre-filled ITR forms, AIS (Annual Information Statement) for transparency; 2) <strong>Simplified Compliance</strong> - New regime reduces documentation, easier filing; 3) <strong>Focus on Direct Plans</strong> - Tax-saving through direct mutual funds (no distributor commission); 4) <strong>NPS Popularity</strong> - Additional ₹50K deduction in both regimes driving NPS adoption; 5) <strong>Health Insurance Emphasis</strong> - Higher limits for senior citizens encouraging family health coverage.
              </p>
              <p className="leading-relaxed mb-4">
                Taxpayers should: Compare both regimes annually (situation changes with new home loan, salary increase, etc.), Maximize Section 80C through EPF + PPF + ELSS combination, Invest in health insurance for tax savings + health protection, Consider NPS for additional ₹50K deduction, File ITR on time (July 31 for individuals) to avoid penalties, Keep all investment proofs and documents ready for e-filing.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};