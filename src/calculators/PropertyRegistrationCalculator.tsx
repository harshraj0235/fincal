import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, FileText } from 'lucide-react';

export const PropertyRegistrationCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(5000000);
  const [state, setState] = useState<string>('maharashtra');
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [includeStampDuty, setIncludeStampDuty] = useState<boolean>(true);
  
  const [stampDuty, setStampDuty] = useState<number>(0);
  const [registrationCharges, setRegistrationCharges] = useState<number>(0);
  const [legalCharges, setLegalCharges] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  
  useEffect(() => {
    // Calculate registration costs
    let stampDutyRate = 0;
    let registrationRate = 0;
    
    switch (state) {
      case 'maharashtra':
        stampDutyRate = propertyType === 'residential' ? 0.05 : 0.06;
        registrationRate = 0.01;
        break;
      case 'karnataka':
        stampDutyRate = propertyType === 'residential' ? 0.056 : 0.066;
        registrationRate = 0.01;
        break;
      case 'delhi':
        stampDutyRate = propertyType === 'residential' ? 0.06 : 0.07;
        registrationRate = 0.01;
        break;
      default:
        stampDutyRate = 0.05;
        registrationRate = 0.01;
    }
    
    const calculatedStampDuty = includeStampDuty ? propertyValue * stampDutyRate : 0;
    const calculatedRegistration = Math.min(propertyValue * registrationRate, 30000);
    const calculatedLegal = Math.min(propertyValue * 0.01, 50000);
    
    setStampDuty(calculatedStampDuty);
    setRegistrationCharges(calculatedRegistration);
    setLegalCharges(calculatedLegal);
    setTotalCost(propertyValue + calculatedStampDuty + calculatedRegistration + calculatedLegal);
  }, [propertyValue, state, propertyType, includeStampDuty]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-[--primary-600]" />
          Registration Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="property-value" className="text-sm font-medium text-neutral-700">
                Property Value (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(propertyValue)}
              </span>
            </div>
            <input 
              type="range" 
              id="property-value"
              min="1000000" 
              max="50000000" 
              step="100000" 
              value={propertyValue} 
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="input"
            >
              <option value="maharashtra">Maharashtra</option>
              <option value="karnataka">Karnataka</option>
              <option value="delhi">Delhi</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Property Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  propertyType === 'residential'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPropertyType('residential')}
              >
                Residential
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  propertyType === 'commercial'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPropertyType('commercial')}
              >
                Commercial
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-stamp-duty"
              checked={includeStampDuty}
              onChange={(e) => setIncludeStampDuty(e.target.checked)}
              className="rounded border-neutral-300 text-[--primary-600] focus:ring-[--primary-500]"
            />
            <label htmlFor="include-stamp-duty" className="text-sm font-medium text-neutral-700">
              Include Stamp Duty in Calculation
            </label>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Registration Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Registration Cost</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalCost)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Additional Charges</p>
              <p className="text-xl font-bold text-neutral-900">
                {formatCurrency(stampDuty + registrationCharges + legalCharges)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Cost Breakup
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Charges Breakup</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Property Value</span>
                  <span className="font-medium">{formatCurrency(propertyValue)}</span>
                </div>
                {includeStampDuty && (
                  <div className="flex justify-between">
                    <span>Stamp Duty</span>
                    <span className="font-medium">{formatCurrency(stampDuty)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Registration Charges</span>
                  <span className="font-medium">{formatCurrency(registrationCharges)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Legal Charges</span>
                  <span className="font-medium">{formatCurrency(legalCharges)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                  <span className="font-medium">Total Cost</span>
                  <span className="font-medium">{formatCurrency(totalCost)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Required Documents</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Sale Deed / Agreement</li>
                <li>Property Title Documents</li>
                <li>Identity Proof</li>
                <li>Address Proof</li>
                <li>PAN Card</li>
                <li>Photographs</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Registration must be done within 4 months of execution</li>
                <li>All parties must be present during registration</li>
                <li>Carry original documents for verification</li>
                <li>Payment modes may vary by state</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};