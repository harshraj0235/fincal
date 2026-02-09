import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, FileText, HelpCircle } from 'lucide-react';
import { BarChart } from '../components/BarChart';

export const IncomeTaxRegimeComparisonCalculator: React.FC = () => {
  // Income details
  const [annualIncome, setAnnualIncome] = useState<number>(1000000);
  const [age, setAge] = useState<'below60' | '60to80' | 'above80'>('below60');
  
  // Old regime deductions
  const [section80C, setSection80C] = useState<number>(150000);
  const [section80D, setSection80D] = useState<number>(25000);
  const [section80G, setSection80G] = useState<number>(10000);
  const [hra, setHra] = useState<number>(120000);
  const [housingLoanInterest, setHousingLoanInterest] = useState<number>(200000);
  const [standardDeduction, setStandardDeduction] = useState<number>(50000);
  const [nps, setNps] = useState<number>(50000);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);
  
  // Calculated values
  const [oldRegimeTax, setOldRegimeTax] = useState<number>(0);
  const [newRegimeTax, setNewRegimeTax] = useState<number>(0);
  const [oldRegimeTaxableIncome, setOldRegimeTaxableIncome] = useState<number>(0);
  const [newRegimeTaxableIncome, setNewRegimeTaxableIncome] = useState<number>(0);
  const [oldRegimeDeductions, setOldRegimeDeductions] = useState<number>(0);
  const [taxSavings, setTaxSavings] = useState<number>(0);
  const [betterRegime, setBetterRegime] = useState<'old' | 'new'>('new');
  
  // Tax slabs
  const [oldRegimeSlabs, setOldRegimeSlabs] = useState<Array<{label: string; amount: number; rate: number; tax: number}>>([]);
  const [newRegimeSlabs, setNewRegimeSlabs] = useState<Array<{label: string; amount: number; rate: number; tax: number}>>([]);
  
  useEffect(() => {
    // Calculate total deductions for old regime
    const totalDeductions = 
      Math.min(section80C, 150000) +
      Math.min(section80D, 100000) +
      section80G +
      hra +
      Math.min(housingLoanInterest, 200000) +
      standardDeduction +
      Math.min(nps, 50000) +
      otherDeductions;
    
    setOldRegimeDeductions(totalDeductions);
    
    // Calculate taxable income for both regimes
    const oldRegimeTaxableInc = Math.max(0, annualIncome - totalDeductions);
    const newRegimeTaxableInc = Math.max(0, annualIncome - 50000); // Standard deduction in new regime
    
    setOldRegimeTaxableIncome(oldRegimeTaxableInc);
    setNewRegimeTaxableIncome(newRegimeTaxableInc);
    
    // Calculate tax for old regime
    const oldRegimeTaxDetails = calculateTaxOldRegime(oldRegimeTaxableInc, age);
    setOldRegimeTax(oldRegimeTaxDetails.totalTax);
    setOldRegimeSlabs(oldRegimeTaxDetails.slabs);
    
    // Calculate tax for new regime
    const newRegimeTaxDetails = calculateTaxNewRegime(newRegimeTaxableInc);
    setNewRegimeTax(newRegimeTaxDetails.totalTax);
    setNewRegimeSlabs(newRegimeTaxDetails.slabs);
    
    // Determine better regime
    const taxDifference = oldRegimeTaxDetails.totalTax - newRegimeTaxDetails.totalTax;
    setBetterRegime(taxDifference > 0 ? 'new' : 'old');
    setTaxSavings(Math.abs(taxDifference));
  }, [
    annualIncome,
    age,
    section80C,
    section80D,
    section80G,
    hra,
    housingLoanInterest,
    standardDeduction,
    nps,
    otherDeductions
  ]);
  
  // Calculate tax for old regime
  const calculateTaxOldRegime = (taxableIncome: number, ageGroup: 'below60' | '60to80' | 'above80') => {
    let tax = 0;
    let remainingIncome = taxableIncome;
    const slabs: Array<{label: string; amount: number; rate: number; tax: number}> = [];
    
    if (ageGroup === 'below60') {
      // For individuals below 60 years
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 250000);
        slabs.push({
          label: '0 - 2.5L',
          amount: slabAmount,
          rate: 0,
          tax: 0
        });
        remainingIncome -= slabAmount;
      }
      
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 250000);
        const slabTax = slabAmount * 0.05;
        slabs.push({
          label: '2.5L - 5L',
          amount: slabAmount,
          rate: 5,
          tax: slabTax
        });
        tax += slabTax;
        remainingIncome -= slabAmount;
      }
      
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 500000);
        const slabTax = slabAmount * 0.2;
        slabs.push({
          label: '5L - 10L',
          amount: slabAmount,
          rate: 20,
          tax: slabTax
        });
        tax += slabTax;
        remainingIncome -= slabAmount;
      }
      
      if (remainingIncome > 0) {
        const slabTax = remainingIncome * 0.3;
        slabs.push({
          label: 'Above 10L',
          amount: remainingIncome,
          rate: 30,
          tax: slabTax
        });
        tax += slabTax;
      }
    } else if (ageGroup === '60to80') {
      // For senior citizens (60-80 years)
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 300000);
        slabs.push({
          label: '0 - 3L',
          amount: slabAmount,
          rate: 0,
          tax: 0
        });
        remainingIncome -= slabAmount;
      }
      
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 200000);
        const slabTax = slabAmount * 0.05;
        slabs.push({
          label: '3L - 5L',
          amount: slabAmount,
          rate: 5,
          tax: slabTax
        });
        tax += slabTax;
        remainingIncome -= slabAmount;
      }
      
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 500000);
        const slabTax = slabAmount * 0.2;
        slabs.push({
          label: '5L - 10L',
          amount: slabAmount,
          rate: 20,
          tax: slabTax
        });
        tax += slabTax;
        remainingIncome -= slabAmount;
      }
      
      if (remainingIncome > 0) {
        const slabTax = remainingIncome * 0.3;
        slabs.push({
          label: 'Above 10L',
          amount: remainingIncome,
          rate: 30,
          tax: slabTax
        });
        tax += slabTax;
      }
    } else {
      // For super senior citizens (above 80 years)
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 500000);
        slabs.push({
          label: '0 - 5L',
          amount: slabAmount,
          rate: 0,
          tax: 0
        });
        remainingIncome -= slabAmount;
      }
      
      if (remainingIncome > 0) {
        const slabAmount = Math.min(remainingIncome, 500000);
        const slabTax = slabAmount * 0.2;
        slabs.push({
          label: '5L - 10L',
          amount: slabAmount,
          rate: 20,
          tax: slabTax
        });
        tax += slabTax;
        remainingIncome -= slabAmount;
      }
      
      if (remainingIncome > 0) {
        const slabTax = remainingIncome * 0.3;
        slabs.push({
          label: 'Above 10L',
          amount: remainingIncome,
          rate: 30,
          tax: slabTax
        });
        tax += slabTax;
      }
    }
    
    // Calculate surcharge if applicable
    let surcharge = 0;
    if (taxableIncome > 5000000 && taxableIncome <= 10000000) {
      surcharge = tax * 0.1;
    } else if (taxableIncome > 10000000 && taxableIncome <= 20000000) {
      surcharge = tax * 0.15;
    } else if (taxableIncome > 20000000 && taxableIncome <= 50000000) {
      surcharge = tax * 0.25;
    } else if (taxableIncome > 50000000) {
      surcharge = tax * 0.37;
    }
    
    // Calculate cess (4% of tax + surcharge)
    const cess = (tax + surcharge) * 0.04;
    
    // Total tax
    const totalTax = tax + surcharge + cess;
    
    return {
      slabs,
      tax,
      surcharge,
      cess,
      totalTax
    };
  };
  
  // Calculate tax for new regime
  const calculateTaxNewRegime = (taxableIncome: number) => {
    let tax = 0;
    let remainingIncome = taxableIncome;
    const slabs: Array<{label: string; amount: number; rate: number; tax: number}> = [];
    
    // New regime tax slabs (FY 2023-24)
    if (remainingIncome > 0) {
      const slabAmount = Math.min(remainingIncome, 300000);
      slabs.push({
        label: '0 - 3L',
        amount: slabAmount,
        rate: 0,
        tax: 0
      });
      remainingIncome -= slabAmount;
    }
    
    if (remainingIncome > 0) {
      const slabAmount = Math.min(remainingIncome, 300000);
      const slabTax = slabAmount * 0.05;
      slabs.push({
        label: '3L - 6L',
        amount: slabAmount,
        rate: 5,
        tax: slabTax
      });
      tax += slabTax;
      remainingIncome -= slabAmount;
    }
    
    if (remainingIncome > 0) {
      const slabAmount = Math.min(remainingIncome, 300000);
      const slabTax = slabAmount * 0.1;
      slabs.push({
        label: '6L - 9L',
        amount: slabAmount,
        rate: 10,
        tax: slabTax
      });
      tax += slabTax;
      remainingIncome -= slabAmount;
    }
    
    if (remainingIncome > 0) {
      const slabAmount = Math.min(remainingIncome, 300000);
      const slabTax = slabAmount * 0.15;
      slabs.push({
        label: '9L - 12L',
        amount: slabAmount,
        rate: 15,
        tax: slabTax
      });
      tax += slabTax;
      remainingIncome -= slabAmount;
    }
    
    if (remainingIncome > 0) {
      const slabAmount = Math.min(remainingIncome, 300000);
      const slabTax = slabAmount * 0.2;
      slabs.push({
        label: '12L - 15L',
        amount: slabAmount,
        rate: 20,
        tax: slabTax
      });
      tax += slabTax;
      remainingIncome -= slabAmount;
    }
    
    if (remainingIncome > 0) {
      const slabTax = remainingIncome * 0.3;
      slabs.push({
        label: 'Above 15L',
        amount: remainingIncome,
        rate: 30,
        tax: slabTax
      });
      tax += slabTax;
    }
    
    // Calculate surcharge if applicable
    let surcharge = 0;
    if (taxableIncome > 5000000 && taxableIncome <= 10000000) {
      surcharge = tax * 0.1;
    } else if (taxableIncome > 10000000 && taxableIncome <= 20000000) {
      surcharge = tax * 0.15;
    } else if (taxableIncome > 20000000 && taxableIncome <= 50000000) {
      surcharge = tax * 0.25;
    } else if (taxableIncome > 50000000) {
      surcharge = tax * 0.37;
    }
    
    // Calculate cess (4% of tax + surcharge)
    const cess = (tax + surcharge) * 0.04;
    
    // Total tax
    const totalTax = tax + surcharge + cess;
    
    return {
      slabs,
      tax,
      surcharge,
      cess,
      totalTax
    };
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
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
            Income & Deduction Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="annual-income" className="text-sm font-medium text-neutral-700">
                  Annual Income (₹)
                </label>
                <span className="text-sm text-neutral-500">
                  {formatCurrency(annualIncome)}
                </span>
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
            
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-md font-medium text-neutral-900 mb-3 flex items-center">
                Deductions & Exemptions
                <span className="ml-2 text-xs text-white bg-[--primary-600] px-2 py-0.5 rounded-full">Old Regime Only</span>
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
                    <span className="text-sm text-neutral-500">
                      {formatCurrency(section80C)}
                    </span>
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
                    <span className="text-sm text-neutral-500">
                      {formatCurrency(section80D)}
                    </span>
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
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                      <span className="text-sm text-neutral-500">
                        {formatCurrency(section80G)}
                      </span>
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
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label htmlFor="nps" className="text-sm font-medium text-neutral-700 flex items-center group">
                        NPS (80CCD)
                        <span className="group relative ml-1">
                          <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
                          <span className="tooltip">
                            Additional deduction for NPS contribution
                          </span>
                        </span>
                      </label>
                      <span className="text-sm text-neutral-500">
                        {formatCurrency(nps)}
                      </span>
                    </div>
                    <input 
                      type="range" 
                      id="nps"
                      min="0" 
                      max="50000" 
                      step="5000" 
                      value={nps} 
                      onChange={(e) => setNps(Number(e.target.value))}
                      className="slider"
                    />
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
                    <span className="text-sm text-neutral-500">
                      {formatCurrency(hra)}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="hra"
                    min="0" 
                    max="300000" 
                    step="10000" 
                    value={hra} 
                    onChange={(e) => setHra(Number(e.target.value))}
                    className="slider"
                  />
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
                    <span className="text-sm text-neutral-500">
                      {formatCurrency(housingLoanInterest)}
                    </span>
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
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="other-deductions" className="text-sm font-medium text-neutral-700 flex items-center group">
                      Other Deductions
                      <span className="group relative ml-1">
                        <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
                        <span className="tooltip">
                          Other eligible deductions under various sections
                        </span>
                      </span>
                    </label>
                    <span className="text-sm text-neutral-500">
                      {formatCurrency(otherDeductions)}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="other-deductions"
                    min="0" 
                    max="200000" 
                    step="10000" 
                    value={otherDeductions} 
                    onChange={(e) => setOtherDeductions(Number(e.target.value))}
                    className="slider"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
            <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Tax Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Old Regime Tax</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(oldRegimeTax)}</p>
                <p className="text-sm text-neutral-600">Taxable Income: {formatCurrency(oldRegimeTaxableIncome)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">New Regime Tax</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(newRegimeTax)}</p>
                <p className="text-sm text-neutral-600">Taxable Income: {formatCurrency(newRegimeTaxableIncome)}</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Verdict</h3>
              <div className="flex items-center">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 ${
                  betterRegime === 'new'
                    ? 'bg-[--success-100] text-[--success-700]' 
                    : 'bg-[--primary-100] text-[--primary-700]'
                }`}>
                  <span className="text-xl">{betterRegime === 'new' ? '🆕' : '🔄'}</span>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">
                    {betterRegime === 'new'
                      ? 'New Tax Regime is better for you' 
                      : 'Old Tax Regime is better for you'}
                  </p>
                  <p className="text-sm text-neutral-600 mt-1">
                    You save {formatCurrency(taxSavings)} with the {betterRegime === 'new' ? 'new' : 'old'} regime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            Tax Calculation Breakdown
          </h2>
          
          <div className="h-64 mb-6">
            <BarChart 
              data={[
                { 
                  label: 'Old Regime', 
                  value: oldRegimeTax,
                  color: betterRegime === 'old' ? '#22c55e' : '#ef4444'
                },
                { 
                  label: 'New Regime', 
                  value: newRegimeTax,
                  color: betterRegime === 'new' ? '#22c55e' : '#ef4444'
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-md font-medium text-neutral-900 mb-3">Old Regime Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Gross Income</span>
                  <span className="font-medium text-neutral-900">{formatCurrency(annualIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Total Deductions</span>
                  <span className="font-medium text-[--success-600]">- {formatCurrency(oldRegimeDeductions)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-200">
                  <span className="font-medium text-neutral-700">Taxable Income</span>
                  <span className="font-medium text-neutral-900">{formatCurrency(oldRegimeTaxableIncome)}</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-1">
                {oldRegimeSlabs.map((slab, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-neutral-500">{slab.label} @ {slab.rate}%</span>
                    <span className="text-neutral-700">{formatCurrency(slab.tax)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs pt-1 border-t border-neutral-200">
                  <span className="font-medium text-neutral-700">Total Tax</span>
                  <span className="font-medium text-[--error-600]">{formatCurrency(oldRegimeTax)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-md font-medium text-neutral-900 mb-3">New Regime Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Gross Income</span>
                  <span className="font-medium text-neutral-900">{formatCurrency(annualIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Standard Deduction</span>
                  <span className="font-medium text-[--success-600]">- {formatCurrency(50000)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-200">
                  <span className="font-medium text-neutral-700">Taxable Income</span>
                  <span className="font-medium text-neutral-900">{formatCurrency(newRegimeTaxableIncome)}</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-1">
                {newRegimeSlabs.map((slab, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-neutral-500">{slab.label} @ {slab.rate}%</span>
                    <span className="text-neutral-700">{formatCurrency(slab.tax)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs pt-1 border-t border-neutral-200">
                  <span className="font-medium text-neutral-700">Total Tax</span>
                  <span className="font-medium text-[--error-600]">{formatCurrency(newRegimeTax)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <FileText className="w-5 h-5 mr-2 text-primary-600" />
              Regime Comparison
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Old Regime Features</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                  <li>Higher tax rates but allows various deductions and exemptions</li>
                  <li>Beneficial for those with significant investments and deductions</li>
                  <li>Includes deductions under Sections 80C, 80D, 80G, etc.</li>
                  <li>Allows HRA exemption and home loan interest deduction</li>
                  <li>Standard deduction of ₹50,000 for salaried individuals</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">New Regime Features</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                  <li>Lower tax rates but most deductions and exemptions are not available</li>
                  <li>Beneficial for those with minimal investments or deductions</li>
                  <li>Simpler tax structure with more slabs</li>
                  <li>Only standard deduction of ₹50,000 is allowed</li>
                  <li>No deductions for HRA, home loan interest, or investments</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[--accent-50] rounded-lg">
                <h3 className="text-lg font-medium text-[--accent-900] mb-2">Who Should Choose Which Regime?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-[--accent-800] mb-1">Old Regime is Better For:</h4>
                    <ul className="list-disc list-inside text-[--accent-700] space-y-1">
                      <li>Salaried individuals with high HRA</li>
                      <li>Those with home loans</li>
                      <li>People with significant investments</li>
                      <li>Individuals with high medical expenses</li>
                      <li>Those making charitable donations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-[--accent-800] mb-1">New Regime is Better For:</h4>
                    <ul className="list-disc list-inside text-[--accent-700] space-y-1">
                      <li>Individuals with few investments</li>
                      <li>Self-employed with limited deductions</li>
                      <li>Those with income below ₹7.5 lakhs</li>
                      <li>People who prefer simplicity</li>
                      <li>New entrants to the workforce</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTaxRegimeComparisonCalculator;