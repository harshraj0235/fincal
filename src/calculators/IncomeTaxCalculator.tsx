import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateIncomeTax } from '../utils/calculatorUtils';
import { Sliders, Calculator, FileText, HelpCircle } from 'lucide-react';
import { BarChart } from '../components/BarChart';

export const IncomeTaxCalculator: React.FC = () => {
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [annualIncome, setAnnualIncome] = useState<number>(1000000);
  const [age, setAge] = useState<'below60' | '60to80' | 'above80'>('below60');
  const [section80C, setSection80C] = useState<number>(150000);
  const [section80D, setSection80D] = useState<number>(25000);
  const [section80G, setSection80G] = useState<number>(0);
  const [hra, setHra] = useState<number>(0);
  const [housingLoanInterest, setHousingLoanInterest] = useState<number>(0);
  
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
  
  return (
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
                    <span className="text-sm text-neutral-500">
                      {formatCurrency(hra)}
                    </span>
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
  );
};