import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator } from 'lucide-react';

export const HraExemptionCalculator: React.FC = () => {
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [hraReceived, setHraReceived] = useState<number>(20000);
  const [rentPaid, setRentPaid] = useState<number>(25000);
  const [isMetroCity, setIsMetroCity] = useState<boolean>(true);
  const [exemptedHra, setExemptedHra] = useState<number>(0);
  const [taxableHra, setTaxableHra] = useState<number>(0);
  
  useEffect(() => {
    // Calculate HRA exemption
    const monthlyBasic = basicSalary;
    const monthlyHra = hraReceived;
    const monthlyRent = rentPaid;
    
    // Calculate as per rules
    const actualHra = monthlyHra;
    const rentLessBasic = monthlyRent - (monthlyBasic * 0.1);
    const basicPercent = monthlyBasic * (isMetroCity ? 0.5 : 0.4);
    
    // Exempted HRA is minimum of:
    // 1. Actual HRA received
    // 2. Rent paid - 10% of basic salary
    // 3. 50% of basic salary (metro) or 40% of basic salary (non-metro)
    const exempted = Math.min(
      actualHra,
      Math.max(0, rentLessBasic),
      basicPercent
    );
    
    setExemptedHra(exempted);
    setTaxableHra(monthlyHra - exempted);
  
  }, [basicSalary, hraReceived, rentPaid, isMetroCity]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Salary & Rent Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="basic-salary" className="text-sm font-medium text-neutral-700">
                Monthly Basic Salary (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(basicSalary)}
              </span>
            </div>
            <input 
              type="range" 
              id="basic-salary"
              min="10000" 
              max="500000" 
              step="1000" 
              value={basicSalary} 
              onChange={(e) => setBasicSalary(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹10,000</span>
              <span>₹5,00,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="hra-received" className="text-sm font-medium text-neutral-700">
                Monthly HRA Received (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(hraReceived)}
              </span>
            </div>
            <input 
              type="range" 
              id="hra-received"
              min="0" 
              max={basicSalary * 0.5} 
              step="1000" 
              value={hraReceived} 
              onChange={(e) => setHraReceived(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹0</span>
              <span>{formatCurrency(basicSalary * 0.5)}</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="rent-paid" className="text-sm font-medium text-neutral-700">
                Monthly Rent Paid (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(rentPaid)}
              </span>
            </div>
            <input 
              type="range" 
              id="rent-paid"
              min="0" 
              max="100000" 
              step="1000" 
              value={rentPaid} 
              onChange={(e) => setRentPaid(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹0</span>
              <span>₹1,00,000</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              City Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isMetroCity
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setIsMetroCity(true)}
              >
                Metro City
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  !isMetroCity
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setIsMetroCity(false)}
              >
                Non-Metro City
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">HRA Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Exempted HRA</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(exemptedHra)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Taxable HRA</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(taxableHra)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            HRA Calculation Rules
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Exemption Criteria</h3>
              <p className="text-sm text-neutral-600">
                HRA exemption is the minimum of:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600 mt-2">
                <li>Actual HRA received</li>
                <li>Rent paid minus 10% of basic salary</li>
                <li>{isMetroCity ? '50%' : '40%'} of basic salary (for {isMetroCity ? 'metro' : 'non-metro'} cities)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Your Calculation</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Actual HRA:</span> {formatCurrency(hraReceived)}</p>
                <p><span className="font-medium">Rent - 10% Basic:</span> {formatCurrency(rentPaid - (basicSalary * 0.1))}</p>
                <p><span className="font-medium">{isMetroCity ? '50%' : '40%'} of Basic:</span> {formatCurrency(basicSalary * (isMetroCity ? 0.5 : 0.4))}</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Metro cities include Delhi NCR, Mumbai, Chennai, and Kolkata</li>
                <li>Rent receipts are mandatory for claiming HRA</li>
                <li>PAN of landlord required if rent exceeds ₹1 lakh per year</li>
                <li>HRA exemption is available only if you live in rented accommodation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};